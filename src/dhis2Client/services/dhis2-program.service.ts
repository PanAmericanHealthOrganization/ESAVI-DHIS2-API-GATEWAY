import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import {
  IProgramSchema,
  IProgramStage,
  IProgramStageSection,
} from '../dto/programSchema.dto';
@Injectable()
export class Dhis2ProgramService {
  constructor(private readonly httpService: HttpService) {}

  /**
   *
   * @param tei
   * @returns
   */
  public async getProgramFieldsStructure(
    programId: string,
  ): Promise<IProgramSchema> {
    // get entity schema
    const programSchema = await this.getProgramEntitySchema(programId);

    // get program stages schema
    const programStagesTmp = await this.getProgramStagesSchema(
      programSchema.programStages,
    );
    programSchema.programStages = programStagesTmp;

    return programSchema;
  }

  private async getProgramEntitySchema(
    programId: string,
  ): Promise<IProgramSchema> {
    const url = `/api/programs/${programId}.json?fields=programTrackedEntityAttributes[id,displayName,mandatory,sortOrder],displayName,displayFormName,shortName,name,id,programStages`;
    try {
      const { data } = await firstValueFrom(
        this.httpService.get<IProgramSchema>(url),
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }

  private async getProgramStagesSchema(
    programStages: IProgramStage[],
  ): Promise<IProgramStage[]> {
    // por cada program estage, traer sus sections
    const programStagesTmp = [];
    for (const programStage of programStages) {
      const data = await this.getProgramStageSectionsSchema(programStage.id);
      programStagesTmp.push(data);
    }
    return programStagesTmp;
  }

  private async getProgramStageSectionsSchema(
    programStageId: string,
  ): Promise<IProgramStageSection> {
    const url = `/api/programStages/${programStageId}.json?fields=name,sortOrder,displayFormName,programStageSections[id,name,displayName,sortOrder,dataElements[displayName,id,code,order,formName,optionSetValue]]`;

    const { data } = await firstValueFrom(
      this.httpService.get<IProgramStageSection>(url),
    );

    return data;
  }
}
