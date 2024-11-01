import { CustomBaseEntity } from 'src/utils/interfaces/baseEntity';
import { Column, Entity } from 'typeorm';
import { SyncStateEnum } from '../utils/sycnstate.enum';
import { IDrugSync } from './dtos/drugSync.dto';

@Entity({ name: 'drug_sync', schema: 'who_drug' })
export class DrugSync extends CustomBaseEntity implements IDrugSync {
  /**
   *
   * Description:
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
  @Column({ name: 'drs_procces_id', length: 11, nullable: false })
  proccesId: string;

  /**
   *
   */
  @Column({
    name: 'drs_sha_256',
    nullable: false,
    comment: 'SHA-256 hash del archivo',
    length: 258,
  })
  sha256: string;

  /**
   *
   * Description:
   */
  @Column({ name: 'drs_start_sync_date' })
  startSyncDate: Date;

  /**
   *
   * Description:
   */
  @Column({ name: 'drs_end_sync_date', nullable: true })
  endSyncDate: Date;

  /**
   *
   * Description:
   */
  @Column({
    name: 'drs_sync_status',
    type: 'enum',
    enum: SyncStateEnum,
    default: SyncStateEnum.STARTED,
  })
  syncStatus: SyncStateEnum;
}

export class DrugSyncBuilder {
  private drugSync: DrugSync;

  constructor() {
    this.drugSync = new DrugSync();
  }

  public setId(id: string): DrugSyncBuilder {
    this.drugSync.id = id;
    return this;
  }

  public setStartSyncDate(startSyncDate: Date): DrugSyncBuilder {
    this.drugSync.startSyncDate = startSyncDate;
    return this;
  }
  public setProccesId(proccesId: string): DrugSyncBuilder {
    this.drugSync.proccesId = proccesId;
    return this;
  }

  public setEndSyncDate(endSyncDate: Date): DrugSyncBuilder {
    this.drugSync.endSyncDate = endSyncDate;
    return this;
  }

  public setSyncStatus(syncStatus: SyncStateEnum): DrugSyncBuilder {
    this.drugSync.syncStatus = syncStatus;
    return this;
  }

  public setEnabled(enabled: boolean): DrugSyncBuilder {
    this.drugSync.enabled = enabled;
    return this;
  }

  public setState(state: boolean): DrugSyncBuilder {
    this.drugSync.state = state;
    return this;
  }
  public setSha256(state: string): DrugSyncBuilder {
    this.drugSync.sha256 = state;
    return this;
  }

  public build(): DrugSync {
    return this.drugSync;
  }
}
