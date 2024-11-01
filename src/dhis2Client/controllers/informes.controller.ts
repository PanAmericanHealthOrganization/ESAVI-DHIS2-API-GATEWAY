import { Controller, Get, Header, HttpStatus, Param, StreamableFile } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Dhis2EventsService } from '../services/dhis2-events.service';
import { InformesService } from '../services/informes.service';
import { EventDTO } from '../dto/dhis2.events.dto';
/**
 *
 */
@ApiTags('DHIS2 - Extensions')
@Controller({ path: 'dhis2/informs', version: '1' })
export class InformesController {
  constructor(
    private readonly informesService: InformesService,
    private readonly dhis2EventsService: Dhis2EventsService,
  ) {}

  /**
   *
   * @param eventId
   * @param resourceName
   * @returns
   */
  @Get('/event-report/:eventId/resource/:resourceName')
  @Header('Content-type', 'application/pdf')
  public async getInformes(
    @Param('eventId') eventId: string,
    @Param('resourceName') resourceName: string,
  ): Promise<StreamableFile> {
    if (!eventId || !resourceName) {
      throw HttpStatus.BAD_REQUEST;
    }
    const pdf = await this.informesService.getReport(eventId, resourceName);
    return new StreamableFile(pdf);
  }

  /**
   *
   * @param eventId
   * @param resourceName
   * @returns
   */
  @Get('/event/:eventId.:ext')
  async getEvent(@Param('eventId') eventId: string, @Param('ext') resourceName: string): Promise<EventDTO> {
    console.log(eventId, resourceName);
    return await this.dhis2EventsService.getEventData(eventId);
  }
}
