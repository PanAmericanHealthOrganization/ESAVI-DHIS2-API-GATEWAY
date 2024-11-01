import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Drug } from '../models/drug.entity';
import { uuidGenerator } from '../utils/utils';

export class WhoDrugsAsAnyService {
  constructor(
    @InjectRepository(Drug, 'who_drug')
    private readonly drug: Repository<Drug>,
  ) {}

  public async asDHHIS2OptionSet(params: { country: string; atcCode: string; optionSetName: string }): Promise<any> {
    let drugs = await this.getDrugsCoutry({
      country: params.country,
      atcCode: params.atcCode,
    });
    drugs = drugs.sort((a, b) => (a.drugName > b.drugName ? 1 : -1));
    //
    const optionSetId = uuidGenerator(11);
    // obtener las drogas de un pais
    const optionSets = this.buildOptionSet(optionSetId, params.optionSetName ?? 'GEN - WHODRUGS');

    const options = this.buildDHIS2Option(drugs, optionSetId);
    const optionId = options.map((option, index) => {
      return {
        id: option.id,
        sortOrder: index + 1,
      };
    });
    optionSets.options = optionId;
    return {
      options,
      optionSets: [optionSets],
    };
  }

  public async getDrugsCoutry(params: { country: string; atcCode: string }): Promise<any> {
    const r = this.drug
      .createQueryBuilder('drug')
      .select(['drug.drugName', 'drug.drugCode'])
      .innerJoin('drug.countriesOfSale', 'countriesOfSale')
      .innerJoin('drug.anatomicalTherapeuticChemical', 'anatomicalTherapeuticChemical')
      .where('countriesOfSale.iso3Code = :country', {
        country: params.country,
      });
    if (params.atcCode) {
      r.andWhere('anatomicalTherapeuticChemical.code ILIKE :atcCode', {
        atcCode: `%${params.atcCode}%`,
      });
    }
    r.orderBy('drug.drugName', 'DESC');

    return await r.getMany();
  }

  /**
   *
   * @param drugs
   * @param optionSetId
   * @returns
   */
  public buildDHIS2Option(drugs: Drug[], optionSetId: string): any {
    const optionSet = drugs.map((drug, index) => {
      return {
        code: drug.drugCode,
        name: drug.drugName,
        id: uuidGenerator(11),
        optionSet: {
          id: optionSetId,
        },
        sortOrder: index + 1,
        attributeValues: [],
        translations: [],
      };
    });
    return optionSet;
  }

  public buildOptionSet(optionSetId: string, name: string): any {
    const optionSet = {
      name,
      id: optionSetId,
      valueType: 'TEXT',
      options: [],
    };
    return optionSet;
  }
}
