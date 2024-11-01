export interface IProgramSchema {
  id: string;
  name: string;
  shortName: string;
  displayName: string;
  displayFormName: string;
  programTrackedEntityAttributes: IProgramTrackedEntityAttribute[];
  programStages: IProgramStage[];
}
export interface IProgramTrackedEntityAttribute {
  id: string;
  displayName: string;
  sortOrder: number;
  mandatory: boolean;
}

export interface IProgramStage {
  id: string;
  name: string;
  displayName: string;
  sortOrder: number;
  programStageSections: IProgramStageSection[];
}

export interface IProgramStageSection {
  name: string;
  id: string;
  displayName: string;
  sortOrder: number;
  dataElements: IDataElement[];
}
export interface IDataElement {
  id: string;
  displayName: string;
  formName?: string;
  optionSetValue: boolean;
}
