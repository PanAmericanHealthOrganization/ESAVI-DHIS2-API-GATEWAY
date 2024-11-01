import { Controller, Get, Param } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Parameter } from '../models/parameter.entity';
import { ParameterService } from '../services/parameter.service';
/*
 *
 *
 */
@ApiTags('Parameters')
@Controller({ path: 'parameter', version: '1' })
export class ParamController {
  //
  constructor(private readonly parameterService: ParameterService) {}

  @Get('/:id')
  public async getParamById(@Param('id') id: number): Promise<Partial<Parameter>> {
    return await this.parameterService.getParameterById(id);
  }
}
