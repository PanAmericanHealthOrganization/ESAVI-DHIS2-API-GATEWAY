import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CountryOfSale } from '../models/countryOfSale.entity';
import { Drug } from '../models/drug.entity';
import { ICountryOfSale } from '../models/dtos/drug.dto';
import { MaholderService } from './maholder.service';

@Injectable()
export class CountryOfSaleService {
  constructor(
    private readonly maholderService: MaholderService,
    @InjectRepository(CountryOfSale, 'who_drug')
    private readonly countrySale: Repository<CountryOfSale>,
  ) {}

  public async syncCountrySale(countriesOfSale: ICountryOfSale[], drugSaved: Drug) {
    if (countriesOfSale.length > 0) {
      for (const countryOfSale of countriesOfSale) {
        let countrySaleEntity = new CountryOfSale();
        countrySaleEntity.iso3Code = countryOfSale.iso3Code;
        countrySaleEntity.medicinalProductID = countryOfSale.medicinalProductID;
        countrySaleEntity.drug = drugSaved;
        countrySaleEntity = await this.countrySale.save(countrySaleEntity);

        await this.maholderService.syncMaholder(countryOfSale.maHolders || [], countrySaleEntity);
      }
    }
  }
}
