import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';
import { MeddraStandarDto } from '../models/dto/meddraStandar.dto';
import { LLT } from '../models/standar/llt.entity';
import { PT } from '../models/standar/pt.entity';
import { SOC } from '../models/standar/soc.entity';
import { cie10Meddra } from '../models/mapping/cie19meddra.entity';
import { CIE10ES } from '../models/standar/cie_19.entity';
@Injectable()
export class MeddraStandarService {
  constructor(
    @InjectRepository(LLT, 'meddra')
    private readonly lltRepository: Repository<LLT>,
    @InjectRepository(PT, 'meddra')
    private readonly ptRepository: Repository<PT>,
    @InjectRepository(SOC, 'meddra')
    private readonly socRepository: Repository<SOC>,
    @InjectRepository(cie10Meddra, 'meddra')
    private readonly cie10MeddraRepository: Repository<cie10Meddra>,
    @InjectRepository(CIE10ES, 'meddra')
    private readonly CIE10ESRepository: Repository<CIE10ES>,
  ) {}

  async getLltByCode(code: string): Promise<MeddraStandarDto> {
    const llt = await this.lltRepository.findOne({
      where: { code: ILike(code) },
    });

    const pt = await this.ptRepository.findOne({
      where: { code: ILike(llt?.ptCode) },
    });

    const soc = await this.socRepository.findOne({
      where: { code: ILike(pt?.socCode) },
    });

    const cie10Meddra = await this.cie10MeddraRepository.findOne({
      where: { meddra_llt_code: ILike(llt?.code) },
    });

    const cie10Meddraespaniol = await this.CIE10ESRepository.findOne({
      where: { code: ILike(cie10Meddra?.icd10_code) },
    });

    const meddraStandar = new MeddraStandarDto();
    meddraStandar.lltCode = llt?.code;
    meddraStandar.lltName = llt?.name;
    meddraStandar.ptCode = pt?.code;
    meddraStandar.ptName = pt?.name;
    meddraStandar.socCode = soc?.code;
    meddraStandar.socName = soc?.name;
    //meddraStandar.cie10Name = cie10Meddra?.icd10_term;
    meddraStandar.cie10Name = cie10Meddraespaniol?.description;
    cie10Meddraespaniol;
    meddraStandar.cie10Code = cie10Meddra?.icd10_code;
    meddraStandar.cie10MeddraEquivalence = cie10Meddra?.equivalence;

    return meddraStandar;
  }
}
