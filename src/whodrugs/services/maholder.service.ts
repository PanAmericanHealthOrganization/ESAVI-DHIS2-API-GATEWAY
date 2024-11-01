import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Maholder } from '../models/maholder.entity';
import { Repository } from 'typeorm';
import { IMaHolder } from '../models/dtos/drug.dto';
import { CountryOfSale } from '../models/countryOfSale.entity';

@Injectable()
export class MaholderService {
  constructor(
    @InjectRepository(Maholder, 'who_drug')
    private readonly maholder: Repository<Maholder>,
  ) {}

  public async syncMaholder(maholders: IMaHolder[], countrySale: CountryOfSale) {
    if (maholders.length > 0) {
      for (const maholder of maholders) {
        const maholderEntity = new Maholder();
        maholderEntity.name = maholder.name;
        maholderEntity.countrySale = countrySale;
        await this.maholder.save(maholderEntity);
      }
    }
  }

  public async getMaholderOfDrug(drugId: string, coutri: string): Promise<Maholder[]> {
    const r = await this.maholder.find({
      select: { id: true, name: true, medicinalProductID: true },
      where: { countrySale: { drug: { id: drugId }, iso3Code: coutri } },
    });
    console.log(r);
    return r;
  }
}
