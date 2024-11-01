import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { EventDTO } from '../dto/dhis2.events.dto';

@Injectable()
export class Dhis2EventsService {
  constructor(private readonly httpService: HttpService) {}

  /**
   *
   * @param eventid
   * @returns
   */
  public async getEventData(eventid: string): Promise<EventDTO> {
    try {
      const url = `/api/events/${eventid}.json`;

      const { data } = await firstValueFrom(
        this.httpService.get(url, {
          auth: {
            username: 'rcasigna',
            password: 'Userdhis2.',
          },
        }),
      );
      return data;
    } catch (error) {}
  }
}
