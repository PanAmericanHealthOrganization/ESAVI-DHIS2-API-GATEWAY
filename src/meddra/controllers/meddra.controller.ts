import { CacheInterceptor } from '@nestjs/cache-manager';
import { Body, Controller, Get, Logger, Param, Post, Query, StreamableFile, UseInterceptors } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { createReadStream } from 'fs';
import { join } from 'path';
import { IMeddraResponse, MeddraQueryRequestDto } from '../models/dto/meddra.query';
import { MeddraClientService } from '../services/meddra-client.service';
import { MeddraStandarService } from '../services/meddra-standar.service';
/**
 *
 */
@ApiTags('MedDra')
@ApiBearerAuth()
@Controller({ path: 'meddra', version: '1' })
export class MeddraController {
  //
  constructor(
    private readonly meddraClientService: MeddraClientService,
    private readonly meddraStandarService: MeddraStandarService,
  ) {}

  private readonly logger = new Logger(MeddraController.name);
  /**
   *
   */
  @Post('/')
  @ApiOperation({
    summary: 'Consuta a servicios de MedDRA, realiza una consulta inteligente',
    description: 'Consulta de datos a meddra, la consulta puede ser de base de datos o por api',
  })
  @UseInterceptors(CacheInterceptor)
  public gerMeddra(@Body() query: MeddraQueryRequestDto): Promise<IMeddraResponse> {
    try {
      return this.meddraClientService.getQuery(query);
    } catch (e) {
      this.logger.error(e);
    }
  }
  /**
   *
   * @param ext
   * @returns
   */
  @ApiOperation({
    summary: 'Descarga de historial de consultas de datos MedDRA',
    description: 'Descarga de datos a meddra, la consulta puede ser de base de datos o por api',
  })
  @Get('/history:ext')
  public async getMeddraHistory(@Param('ext') ext: string) {
    console.log(ext);
    const file = createReadStream(join(process.cwd(), 'package.json'));
    console.log(file);
    return new StreamableFile(file);
  }
  /**
   *
   * @param ext
   * @returns
   */
  @ApiOperation({
    summary: 'Descarga top history de MedDRA',
    description: 'Obtiene el conteo de solicitudes realizadas a api ',
  })
  @Get('/top:ext')
  public async getMeddraTop(@Param('ext') ext: string) {
    console.log(ext);
    const file = createReadStream(join(process.cwd(), 'package.json'));
    return new StreamableFile(file);
  }

  /**
   *
   */
  @ApiOperation({
    summary: 'Consulta de datos del MedDra, coincidencia por lltCode en base de datos',
    description: 'Obtiene los datos de referencia de MedDra',
  })
  @Get('')
  public async getMeddraTree(@Query('lltCode') lltCode: string): Promise<any> {
    return await this.meddraStandarService.getLltByCode(lltCode);
  }
}
