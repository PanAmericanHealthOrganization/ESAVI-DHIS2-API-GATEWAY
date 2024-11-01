import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { endOfDay } from 'date-fns';
import { IsNull, MoreThanOrEqual, Repository } from 'typeorm';
import { WhiteListCors } from '../models/whitelist.entity';
/**
 * Servicio de whitelist
 */
@Injectable()
export class WhiteListCorsService {
  //
  constructor(
    @InjectRepository(WhiteListCors, 'api_gateway')
    private readonly whiteListCorsRepository: Repository<WhiteListCors>,
  ) {}

  /**
   * Obtiene la lista de host habilitados
   * @returns
   */
  async getWhitelist(): Promise<string[]> {
    const domains = await this.whiteListCorsRepository.find({
      select: ['url'],
      where: [{ until: IsNull() }, { until: MoreThanOrEqual(endOfDay(new Date())) }],
    });
    //
    return domains.map((domain) => domain.url);
  }
}
