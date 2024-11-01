import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
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
  @Column({ name: 'code', nullable: true })
  code: string;
  /**
   *
   */
  @Column({ name: 'name', nullable: true })
  name: string;
  /**
   *
   */
  @Column({ name: 'field', nullable: true })
  field: string;
  /**
   *
   */
  @Column({ name: 'soc_code', nullable: true })
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
  @Column({ name: 'whoart_code', nullable: true })
  whoArtCode: string;

  /**
   *
   */
  @Column({ name: 'harts_code', nullable: true })
  hartsCode: string;
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
  @Column({ name: 'jart_code', nullable: true })
  jartCod: string;
}
