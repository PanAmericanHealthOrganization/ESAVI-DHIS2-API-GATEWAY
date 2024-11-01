import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EventDTO } from '../dto/dhis2.events.dto';

@Injectable()
export class Dhis2TEIService {
  constructor(private readonly httpService: HttpService) {}

  /**
   *
   * @param tei
   * @returns
   */
  public async getEventData(
    tei: string,
    programId: string,
    ou: string,
  ): Promise<EventDTO> {
    try {
      const url = `/api/trackedEntityInstances/${tei}.json?program=${programId}&ou=${ou}`;
      const { data } = await firstValueFrom(this.httpService.get(url));
      return data;
    } catch (error) {
      console.log(error);
    }
  }
}
