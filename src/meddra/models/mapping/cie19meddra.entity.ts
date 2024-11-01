import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
/**
 *
 */
@Entity({ name: 'med_cie10_to_med', comment: 'Tabla de homologación CIE10-MEDDRA' })
export class cie10Meddra extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador único de la tabla' })
  id: string;

  /**
   *
   */
  @Column({ name: 'icd10_charper_number', comment: 'Número de capitulo de la CIE10' })
  icd10_charper_number: string;

  /**
   *
   */
  @Column({ name: 'icd10_charper', comment: 'Capitulo de la CIE10' })
  icd10_charper: string;

  /**
   *
   */
  @Column({ name: 'icd10_code', comment: 'Código de la CIE10' })
  icd10_code: string;

  /**
   *
   */
  @Column({ name: 'icd10_term', comment: 'Término de la CIE10' })
  icd10_term: string;

  /**
   *
   */
  @Column({ name: 'meddra_llt_name', comment: 'Nombre de la LLT' })
  meddra_llt_name: string;

  /**
   *
   */
  @Column({ name: 'meddra_llt_code', comment: 'Código de la LLT' })
  meddra_llt_code: string;

  /**
   *
   */
  @Column({ name: 'equivalence', comment: 'Equivalencia de la CIE10-MEDDRA' })
  equivalence: string;

  /**
   *
   */
  @Column({ name: 'meddra_pt_name', comment: 'Nombre de la PT' })
  meddra_pt_name: string;

  /**
   *
   */
  @Column({ name: 'meddra_pt_code', comment: 'Código de la PT' })
  meddra_pt_code: string;
}
