import { Controller, Get, HttpException, HttpStatus, Param } from '@nestjs/common';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { Maholder } from '../models/maholder.entity';
import { MaholderService } from '../services/maholder.service';
/**
 *
 */
@ApiTags('Who Drug')
@Controller({ path: 'whodrug/:drugId/:isoCoutry/maholder', version: '1' })
export class MaholderController {
  constructor(private readonly maholderService: MaholderService) {}
  /**
   *
   * @param drugId
   * @param isoCoutry
   * @returns
   */
  @Get('/')
  @ApiBody({
    description: 'Obtiene los maholders de un producto de medicamentos',
  })
  public async getMaholdersByProductId(
    @Param('drugId') drugId: string,
    @Param('isoCoutry') isoCoutry: string,
  ): Promise<Maholder[]> {
    if (!drugId) {
      throw new HttpException("drugCode can't be empty", HttpStatus.BAD_REQUEST);
    }
    if (!isoCoutry) {
      throw new HttpException("isoCoutry can't be empty", HttpStatus.BAD_REQUEST);
    }
    return await this.maholderService.getMaholderOfDrug(drugId, isoCoutry);
  }
  /**
   *
   * @param drugId
   * @param isoCoutry
   * @returns
   */
  @Get('/:id')
  @ApiBody({
    description: 'Obtiene el ma hoder dado el product ID',
  })
  public async getMaholdersById(
    @Param('id') drugId: string,
    @Param('isoCoutry') isoCoutry: string,
  ): Promise<Maholder[]> {
    if (!drugId) {
      throw new HttpException("id can't be empty", HttpStatus.BAD_REQUEST);
    }
    if (!isoCoutry) {
      throw new HttpException("isoCoutry can't be empty", HttpStatus.BAD_REQUEST);
    }
    return await this.maholderService.getMaholderOfDrug(drugId, isoCoutry);
  }
}
