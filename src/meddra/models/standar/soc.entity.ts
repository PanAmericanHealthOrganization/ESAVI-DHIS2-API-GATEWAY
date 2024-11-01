import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { MeddraSync } from './meddraSync.entity';
import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';

@Entity({ name: 'med_soc', schema: 'meddra' })
export class SOC extends CustomBaseEntity {
  // PK
  @PrimaryGeneratedColumn({ name: 'id', comment: 'Identificador único del registro en base de datos ' })
  id: number;

  /**
   *
   */
  @Column({
    name: 'code',
    comment: 'Código único del soc perteneciente al estandar meddra',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  code: string;

  /**
   *
   */
  @Column({
    name: 'name',
    comment: 'Nombre del soc',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  name: string;

  /**
   *
   */
  @Column({
    name: 'abbrev',
    comment: 'Abreviatura',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  abbrev: string;

  /**
   *
   */
  @Column({
    name: 'whoart_code',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  whoartCode: string;

  /**
   *
   */
  @Column({
    name: 'harts_code',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  hartsCode: string;
  /**

  *
   */
  @Column({
    name: 'costart_sym',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  costartSym: string;
  /**

  *
   */
  @Column({
    name: 'icd9_code',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  icd9Code: string;
  /**

  *
   */
  @Column({
    name: 'icd9cm_code',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  icd9cm_code: string;
  /**

  *
   */
  @Column({
    name: 'icd10_code',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  icd10_code: string;
  /**
   *
   */
  @Column({
    name: 'jart_code',
    comment: '',
    length: 1024,
    type: 'varchar',
    nullable: true,
  })
  jart_code: string;

  /**
   *
   */
  @ManyToOne(() => MeddraSync)
  @JoinColumn({ name: 'sync_id', referencedColumnName: 'id' })
  meddraSync: MeddraSync;
}
