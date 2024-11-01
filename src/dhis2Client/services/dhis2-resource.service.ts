import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { Document, Documents } from '../dto/dhis2.documents.dto';

@Injectable()
export class Dhis2ResourceService {
  constructor(private readonly httpService: HttpService) {}

  private async getResource(resourceName: string): Promise<Document> {
    try {
      const url = `api/documents.json?paging=false&filter=displayName:eq:${resourceName}`;
      // todo: convert in provider
      const { data } = await firstValueFrom(
        this.httpService.get<Documents>(url),
      );
      return data.documents[0];
    } catch (error) {
      console.log(error);
    }
  }

  private async getResourceFile(resourceId: string): Promise<ArrayBuffer> {
    try {
      const url = `api/documents/${resourceId}/data`;
      // todo: convert in provider
      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          responseType: 'arraybuffer',
          auth: {
            username: 'rcasigna',
            password: 'Userdhis2.',
          },
        }),
      );
      return data;
    } catch (error) {
      console.log('error log', error);
    }
  }

  public async getResourceFileByName(
    resourceName: string,
  ): Promise<ArrayBuffer> {
    // find file
    const document = await this.getResource(resourceName);

    // return file
    return this.getResourceFile(document.id);
  }
}
