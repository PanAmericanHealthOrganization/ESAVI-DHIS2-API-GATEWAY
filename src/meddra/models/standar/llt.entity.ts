import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { PT } from './pt.entity';
import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';

/**
 *
 */
@Entity({ name: 'med_llt', schema: 'meddra' })
export class LLT extends CustomBaseEntity {
  /**
   *
   */
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador de la tabla' })
  id: number;

  /**
   *
   */
  @Column({ name: 'code', nullable: true, comment: 'Código de la LLT' })
  code: string;

  /**
   *
   */
  @Column({ name: 'name', nullable: true, comment: 'Nombre de la LLT' })
  name: string;

  /**
   *
   */
  @Column({ name: 'pt_code', nullable: true, comment: 'Código de la PT' })
  ptCode: string;

  /**
   *
   */
  @Column({ name: 'whoart_code', nullable: true })
  whoartCode: string;

  /**
   *
   */
  @Column({ name: 'harts_code', nullable: true })
  hartsCode: string;

  /**
   *
   */
  @Column({ name: 'harts_code2', nullable: true })
  hartsCode2: string;

  /**
   *
   */
  @Column({ name: 'costart_sym', nullable: true })
  costartSym: string;

  /**
   *
   */
  @Column({ name: 'icd9_code', nullable: true })
  icd9Code: string;

  /**
   *
   */
  @Column({ name: 'icd9cm_code', nullable: true })
  icd9cmCode: string;

  /**
   *
   */
  @Column({ name: 'icd10_code', nullable: true })
  icd10Code: string;

  /**
   *
   */
  @Column({ name: 'currency', nullable: true })
  currency: string;

  /**
   *
   */
  @Column({ name: 'jart_code', nullable: true })
  jartCode: string;
  /**
   *
   */
  @ManyToOne(() => PT)
  @JoinColumn({ name: 'id_pt_code', referencedColumnName: 'id' })
  pt: PT;
}
