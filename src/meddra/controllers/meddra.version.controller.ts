import { Body, Controller, HttpException, HttpStatus, Post } from '@nestjs/common';
import { ProcessVersionReqDTO } from '../models/dto/meddra.query';
import { MeddraProcessFilesService } from '../services/meddra-process.service';
import { ApiTags } from '@nestjs/swagger';
/**
 * Controlador para procesar los archivos de meddra
 */
@ApiTags('MedDra Versionamiento')
@Controller({ path: 'meddra/version', version: '1' })
export class MeddraVersionController {
  constructor(private readonly meddraProcessFilesService: MeddraProcessFilesService) {}

  @Post('process')
  async processVersionFiles(@Body() processsVersionReqDto: ProcessVersionReqDTO): Promise<any[]> {
    const { version, lang } = processsVersionReqDto;
    try {
      return this.meddraProcessFilesService.processVersionFiles(version, lang, 'ActualizaciÓN SIN DESCRIPCION');
    } catch (e) {
      throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
