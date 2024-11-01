import { Controller, Get, Param } from '@nestjs/common';
import { Dhis2ProgramService } from '../services/dhis2-program.service';
import { IProgramSchema } from '../dto/programSchema.dto';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('DHIS2 - Dictionary')
@Controller({ path: 'dhis2/dictionary', version: '1' })
export class DictionaryController {
  constructor(private readonly dhis2ProgramService: Dhis2ProgramService) {}

  @Get('/:programId')
  async getDictionary(@Param('programId') programId: string): Promise<IProgramSchema> {
    return this.dhis2ProgramService.getProgramFieldsStructure(programId);
  }
}
