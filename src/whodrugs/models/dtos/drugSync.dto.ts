import { SyncStateEnum } from 'src/whodrugs/utils/sycnstate.enum';

export interface IDrugSync {
  id?: string;
  startSyncDate: Date;
  endSyncDate: Date;
  syncStatus: SyncStateEnum;
}

export class DrugSyncDTO implements IDrugSync {
  id?: string;
  startSyncDate: Date;
  endSyncDate: Date;
  syncStatus: SyncStateEnum;
}
