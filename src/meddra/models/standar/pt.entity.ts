import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, Index } from 'typeorm';
import { SOC } from './soc.entity';
import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';

/**
 *
 */
@Entity({ name: 'med_pt', schema: 'meddra' })
export class PT extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador de la tabla' })
  id: number;

  /**
   *
   */
  @Column({ name: 'code', nullable: true, comment: 'Código de la PT' })
  code: string;
  /**
   *
   */
  @Column({ name: 'name', nullable: true, comment: 'Nombre de la PT' })
  name: string;
  /**
   *
   */
  @Column({ name: 'field', nullable: true, comment: 'Campo' })
  field: string;
  /**
   *
   */
  @Column({ name: 'soc_code', nullable: true, comment: 'Código del SOC' })
  socCode: string;

  /**
   *
   */
  @ManyToOne(() => SOC)
  @JoinColumn({ name: 'id_soc_code', referencedColumnName: 'id' })
  soc: SOC;

  /**
   *
   */
  @Column({ name: 'whoart_code', nullable: true, comment: 'Código de la PT en la tabla WHOART' })
  whoArtCode: string;

  /**
   *
   */
  @Column({ name: 'harts_code', nullable: true, comment: 'Código de la PT en la tabla HARTS' })
  hartsCode: string;
  /**
   *
   */
  @Column({ name: 'costart_sym', nullable: true, comment: 'Símbolo de la PT en la tabla COSTART' })
  costartSym: string;
  /**
   *
   */
  @Column({ name: 'icd9_code', nullable: true, comment: 'Código de la PT en la tabla ICD9' })
  icd9Code: string;
  /**
   *
   */
  @Column({ name: 'icd9cm_code', nullable: true, comment: 'Código de la PT en la tabla ICD9CM' })
  icd9cmCode: string;
  /**
   *
   */
  @Column({ name: 'icd10_code', nullable: true, comment: 'Código de la PT en la tabla ICD10' })
  icd10Code: string;
  /**
   *
   */
  @Column({ name: 'jart_code', nullable: true, comment: 'Código de la PT en la tabla JART' })
  jartCod: string;
}
