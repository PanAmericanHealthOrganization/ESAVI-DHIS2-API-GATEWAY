import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AnatomicalTherapeuticChemical } from '../models/atomicTerapeutalChemical.entity';
import { Repository } from 'typeorm';
import { IATC } from '../models/dtos/drug.dto';
import { Drug } from '../models/drug.entity';

@Injectable()
export class AnatomicalTherapeuticChemicalService {
  constructor(
    @InjectRepository(AnatomicalTherapeuticChemical, 'who_drug')
    private readonly drugRepository: Repository<AnatomicalTherapeuticChemical>,
  ) {}

  public async synATC(acts: IATC[], drug: Drug) {
    if (acts.length > 0) {
      for (const act of acts) {
        const actEntity = new AnatomicalTherapeuticChemical();
        actEntity.code = act.code;
        actEntity.text = act.text;
        actEntity.officialFlag = act.officialFlag;
        actEntity.drug = drug;
        await this.drugRepository.save(actEntity);
      }
    }
  }
}
