import { Injectable } from '@nestjs/common';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IMeddraQueryRequest, IMeddraResponse } from '../models/dto/meddra.query';
import { MeddraQuery } from '../models/meddraquerys.entity';

@Injectable()
export class MeddraHistoryService {
  constructor(
    @InjectRepository(MeddraQuery, 'meddra')
    private readonly medraRepository: Repository<MeddraQuery>,
  ) {}

  public async save(query: IMeddraQueryRequest, data: IMeddraResponse): Promise<MeddraQuery> {
    const row = new MeddraQuery();
    row.searchterm = query.searchterms[0].searchterm;
    row.response = JSON.stringify(data);
    row.date = new Date();

    const existe = await this.medraRepository.findOne({
      where: { searchterm: ILike(`${row.searchterm}%`) },
    });
    if (!existe) {
      return await this.medraRepository.save(row);
    }
    return existe;
  }

  public async getFromHistory(serchTearm: string): Promise<MeddraQuery> {
    return await this.medraRepository.findOne({
      where: { searchterm: ILike(`${serchTearm}%`) },
    });
  }
}
