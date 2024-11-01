import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationRequest, IPaginationResponse } from 'src/utils/interfaces/pagination';
import { Repository } from 'typeorm';
import { Drug } from '../models/drug.entity';

@Injectable()
export class DrugService {
  constructor(
    @InjectRepository(Drug, 'who_drug')
    private readonly drugRepository: Repository<Drug>,
  ) {}

  public async getDrugsPaginated(
    request: IPaginationRequest<Drug>,
    drugName: string,
    drugCode: number,
    country: string,
    atcCode: string,
  ): Promise<IPaginationResponse<any[]>> {
    const drugPartial = await this.drugRepository.find({
      select: {
        id: true,
        drugName: true,
        drugCode: true,
        countriesOfSale: {
          iso3Code: true,
        },
        anatomicalTherapeuticChemical: { code: true },
      },
      relations: {
        countriesOfSale: false,
        anatomicalTherapeuticChemical: false,
      },
      where: [
        {
          enabled: true,
          state: true,
          anatomicalTherapeuticChemical: { code: atcCode },
          countriesOfSale: { iso3Code: country },
        },
      ],
    });

    const final = drugPartial
      .map((drug) => {
        drug.drugName = `${drug.drugName}`.toUpperCase();
        return drug;
      })
      .filter(
        (drug) =>
          (!drugName && !drugCode) ||
          (drugName && `${drug.drugName}`.toUpperCase().includes(`${drugName}`.toUpperCase())) ||
          (drugCode && `${drug.drugCode}`.toUpperCase().includes(`${drugCode}`.toUpperCase())),
      )
      .slice(request.page * request.size, request.size);

    return {
      data: final,
      total: final.length,
    };
  }

  private async getDrugs(skip: number, take: number): Promise<Drug[]> {
    const drugPartial = await this.drugRepository.find({
      select: {
        id: true,
        drugName: true,
        drugCode: true,
      },
      where: [{ enabled: true, state: true }],
      skip,
      take,
    });

    return drugPartial.slice(skip, take);
  }
  public async getDrug(id: string): Promise<Drug> {
    return await this.drugRepository.findOneBy({ id });
  }
}
