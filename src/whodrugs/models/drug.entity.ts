import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { encriptionTransformer } from '../utils/whodrug.encript';
import { CountryOfSale } from './countryOfSale.entity';
import { DrugSync } from './drugSync.entity';
import { IDrug } from './dtos/drug.dto';
import { AnatomicalTherapeuticChemical } from './atomicTerapeutalChemical.entity';

/**
 *
 */
@Entity({ name: 'drug', schema: 'who_drug' })
export class Drug extends CustomBaseEntity implements IDrug {
  /**
   *
   */
  @Column({
    primary: true,
    unique: true,
    name: 'id',
    type: 'char',
    length: 11,
    comment: 'Identificador único del registro',
  })
  id: string;

  /**
   *
   */
  @Column({
    name: 'dru_name',
    transformer: encriptionTransformer,
  })
  drugName: string;

  /**
   *
   */
  @Column({
    name: 'dru_code',
    transformer: encriptionTransformer,
  })
  drugCode: string;

  /**
   *
   */
  @Column({ name: 'dru_medicinal_product_id' })
  medicinalProductID: number;

  /**
   *
   */
  @Column({ name: 'dru_is_generic' })
  isGeneric: boolean;

  /**
   *
   */
  @Column({ name: 'dru_is_preferred' })
  isPreferred: boolean;

  /**
   *
   */
  @ManyToOne(() => DrugSync)
  @JoinColumn({ name: 'drs_id', referencedColumnName: 'id' })
  drugSync: DrugSync;

  /**
   *
   */
  @OneToMany(() => CountryOfSale, (cs) => cs.drug)
  countriesOfSale: CountryOfSale[];
  /**
   *
   */
  @OneToMany(() => AnatomicalTherapeuticChemical, (atc) => atc.drug)
  anatomicalTherapeuticChemical: AnatomicalTherapeuticChemical[];
}
