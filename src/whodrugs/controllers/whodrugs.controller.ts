import { Body, Controller, HttpException, HttpStatus, Param, Post, Query } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiQuery, ApiTags } from '@nestjs/swagger';
import { DrugService } from '../services/drugs.service';
import { Drug } from '../models/drug.entity';
import { IPaginationRequest, IPaginationResponse } from 'src/utils/interfaces/pagination';
 
/**
 *
 *
 */
@ApiTags('Who Drug')
@Controller({ path: 'whodrug', version: '1' })
export class WhodrugsController {
  constructor(private readonly drugService: DrugService) {}

  @Post('')
  @ApiOperation({
    summary: 'Consuta de who drugs',
    description: 'Consulta a base de datos de who drugs',
  })
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Entero numero de pagina, mayor a cero',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Entero numero de registros por pagina, mayor a cero',
  })
  @ApiQuery({
    name: 'drugName',
    required: false,
    description: 'String nombre del medicamento',
  })
  @ApiQuery({
    name: 'drugCode',
    required: false,
    description: 'Entero código de medicamento',
  })
  @ApiQuery({
    name: 'drugCode',
    required: false,
    description: 'Entero código de medicamento',
  })
  @ApiBody({
    description: 'Json structure for user object',
  })
  public async getDrugs(
    @Query('page') page: number = 0,
    @Query('size') size: number = 1,
    @Query('drugName') drugName: string,
    @Query('drugCode') drugCode: number,
    @Query('country') country: string,
    @Query('atcCode') atcCode: string,
    @Body() query: Drug | any,
  ): Promise<IPaginationResponse<Drug[]>> {
    const pagingAndFilet: IPaginationRequest<Drug> = {
      page,
      size,
      query,
    };
    if (!country) {
      throw new HttpException("Es necesario el query param 'country'", HttpStatus.BAD_REQUEST);
    }

    return await this.drugService.getDrugsPaginated(pagingAndFilet, drugName, drugCode, country, atcCode);
  }

  public async getDrugsHistory(@Body() query: any, @Param('ext') ext: string) {
    console.log(query, ext);
    return null;
  }
}
