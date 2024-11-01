import { HttpService } from '@nestjs/axios';
import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';

import { ConfigService } from '@nestjs/config';
import { MeddraHistoryService } from './meddra-history.service';
import { IMeddraJWTResponse, IMeddraQueryRequest, IMeddraResponse } from '../models/dto/meddra.query';
import { MeddraQuery } from '../models/meddraquerys.entity';

@Injectable()
export class MeddraClientService {
  constructor(
    private readonly configService: ConfigService,
    private readonly meddraHistoryService: MeddraHistoryService,
    private readonly httpService: HttpService,
  ) {}

  private readonly logger = new Logger(MeddraClientService.name);

  public async getQuery(query: IMeddraQueryRequest): Promise<IMeddraResponse> {
    try {
      const myResponse = await this.getHistory(query.searchterms[0].searchterm);
      if (myResponse) {
        this.logger.log('Respuesta desde base de datos');
        return JSON.parse(myResponse.response) as IMeddraResponse;
      }
      // get token
      const token = await this.getToken();
      // get response
      this.logger.log('Respuesta desde servicio de meddra');
      return await this.doRequest(query, token.access_token);
    } catch (e) {
      throw e;
    }
  }

  public async getHistory(searchTerm: string): Promise<MeddraQuery> {
    return await this.meddraHistoryService.getFromHistory(searchTerm);
  }

  private async getToken(): Promise<IMeddraJWTResponse> {
    // add headers
    const requestConfig = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    };

    // add query params
    const data = new URLSearchParams({
      grant_type: this.configService.get('MED_GRANT_TYPE'),
      client_id: this.configService.get('MED_CLIENT_ID'),
      username: this.configService.get('MED_USER_NAME'),
      scope: this.configService.get('MED_SCOPE'),
      password: this.configService.get('MED_PASSWORD'),
    });

    // request
    const request = this.httpService.post<IMeddraJWTResponse>(
      'https://mid.meddra.org/connect/token',
      data,
      requestConfig,
    );

    try {
      const { data } = await lastValueFrom(request);
      return data;
    } catch (e) {
      this.logger.error(e);
      if (e.response.status === 400) throw new UnauthorizedException('No autorizado');
      else throw new Error(e);
    }
  }

  private async doRequest(query: IMeddraQueryRequest, token: string): Promise<IMeddraResponse> {
    // add headers
    const headers = { Authorization: `Bearer ${token}` };
    // build request
    const request = this.httpService.post<IMeddraResponse>('https://mapisbx.meddra.org/api/search/', query, {
      headers,
    });

    try {
      const { data } = await lastValueFrom(request);
      // save query
      this.meddraHistoryService
        .save(query, data)
        .then((res) => {
          this.logger.log(res);
        })
        .catch((err) => {
          this.logger.error(err);
        });
      // return data
      return data;
    } catch (e) {
      this.logger.error(e);
      if (e.response.status === 400) throw new UnauthorizedException('No autorizado');
      else throw new Error(e);
    }
  }
}
