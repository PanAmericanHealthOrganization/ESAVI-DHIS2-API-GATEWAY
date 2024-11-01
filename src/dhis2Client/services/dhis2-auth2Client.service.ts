import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class Dhis2Auth2ClientService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  private async getResource(resourceName: string): Promise<any> {}
}
// https://www.youtube.com/watch?v=RK0ij_iMVKA&ab_channel=AlbertHernandez
