export interface EventDTO {
  href: string;
  event: string;
  status: string;
  program: string;
  programStage: string;
  enrollment: string;
  enrollmentStatus: string;
  orgUnit: string;
  orgUnitName: string;
  trackedEntityInstance: string;
  relationships: any[];
  eventDate: string;
  dueDate: string;
  storedBy: string;
  dataValues: DataValue[];
  notes: any[];
  followup: boolean;
  deleted: boolean;
  created: string;
  createdByUserInfo: CreatedByUserInfo2;
  lastUpdated: string;
  lastUpdatedByUserInfo: LastUpdatedByUserInfo2;
  attributeOptionCombo: string;
  attributeCategoryOptions: string;
  completedDate: string;
}

export interface DataValue {
  created: string;
  createdByUserInfo: CreatedByUserInfo;
  lastUpdated: string;
  lastUpdatedByUserInfo: LastUpdatedByUserInfo;
  value: string;
  dataElement: string;
  providedElsewhere: boolean;
}

export interface CreatedByUserInfo {
  uid: string;
  username: string;
  firstName: string;
  surname: string;
}

export interface LastUpdatedByUserInfo {
  uid: string;
  username: string;
  firstName: string;
  surname: string;
}

export interface CreatedByUserInfo2 {
  uid: string;
  username: string;
  firstName: string;
  surname: string;
}

export interface LastUpdatedByUserInfo2 {
  uid: string;
  username: string;
  firstName: string;
  surname: string;
}

export const getdataFromEvent = (event: EventDTO) => {
  const dataValues = event.dataValues;
  let values = {};
  for (const dataValue of dataValues) {
    values = { ...values, [dataValue.dataElement]: dataValue.value };
  }
  return values;
};
