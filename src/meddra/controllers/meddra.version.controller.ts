import {
  Body,
  Controller,
  FileTypeValidator,
  HttpException,
  HttpStatus,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  UploadedFile,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ProcessVersionReqDTO } from '../models/dto/meddra.query';
import { MeddraProcessFilesService } from '../services/meddra-process.service';
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

  @Post('upload')
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 1000 }), new FileTypeValidator({ fileType: 'image/jpeg' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
  }
}
