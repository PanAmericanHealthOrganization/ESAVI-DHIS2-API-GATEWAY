import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { SyncStateEnum } from '../enums/sycnstate.enum';

@Entity({
  name: 'med_sync',
  schema: 'meddra',
  comment: 'Tabla para la gestión de meddra',
})
export class MeddraSync extends CustomBaseEntity {
  constructor(meddraVersion: string, lang: string = 'ES', description: string) {
    super();
    this.meddraVersion = meddraVersion;
    this.description = description;
    this.lang = lang;
  }
  /**
   *
   * Description:
   */
  @PrimaryGeneratedColumn({
    name: 'id',
    comment: 'Identificador único del registro',
  })
  id: number;

  /**
   *
   */
  @Column({
    name: 'syn_med_version',
    length: 11,
    nullable: false,
    comment: 'Versión de meddra',
  })
  meddraVersion: string;

  /**
   *
   */
  @Column({
    name: 'syn_med_lang',
    length: 6,
    nullable: false,
    comment: 'Versión de meddra',
  })
  lang: string;
  /**
   *
   */
  @Column({
    name: 'syn_med_description',
    length: 1024,
    nullable: false,
    comment: 'Descripción de la versión de meddra',
  })
  description: string;

  /**
   *
   * Description:
   */
  @Column({ name: 'drs_start_load_date', nullable: true })
  startSyncDate: Date;

  /**
   *
   * Description:
   */
  @Column({ name: 'drs_end_load_date', nullable: true })
  endSyncDate: Date;

  /**
   *
   * Description:
   */
  @Column({
    name: 'drs_load_status',
    type: 'enum',
    enum: SyncStateEnum,
    default: SyncStateEnum.STARTED,
  })
  syncStatus: SyncStateEnum;
}
