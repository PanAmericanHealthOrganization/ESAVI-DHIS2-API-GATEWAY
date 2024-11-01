import { Injectable } from '@nestjs/common';
import { Dhis2ResourceService } from './dhis2-resource.service';
import { Dhis2EventsService } from './dhis2-events.service';
import { EventDTO, getdataFromEvent } from '../dto/dhis2.events.dto';

const PizZip = require('pizzip');
const Docxtemplater = require('docxtemplater');
const libre = require('libreoffice-convert');
libre.convertAsync = require('util').promisify(libre.convert);

@Injectable()
export class InformesService {
  constructor(
    private readonly dhis2ResourceService: Dhis2ResourceService,
    private readonly dhis2EventsService: Dhis2EventsService,
  ) {}

  public async getReport(eventId: string, resourceName: string): Promise<any> {
    // get template
    const template = await this.dhis2ResourceService.getResourceFileByName(resourceName);

    // get data
    const eventData = await this.dhis2EventsService.getEventData(eventId);

    // set dataTemplate
    const dataAndTemplate = await this.setTemplateData(template, eventData);

    // convertir en pdf
    const pdfBuf = await libre.convertAsync(dataAndTemplate, '.pdf', undefined);

    //
    return pdfBuf;
  }

  private async setTemplateData(templateFile: ArrayBuffer, event: EventDTO) {
    const zip = new PizZip();
    zip.load(templateFile);

    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });
    doc.render(getdataFromEvent(event));
    return doc.getZip().generate({
      type: 'nodebuffer',
      // compression: DEFLATE adds a compression step.
      // For a 50MB output document, expect 500ms additional CPU time
      compression: 'DEFLATE',
    });
  }
}
