import { HttpService } from '@nestjs/axios';
import { Injectable, Logger } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { IDrug } from '../models/dtos/drug.dto';
//import { readFile } from 'fs/promises';
/**
 * @description Clase que sentraliza los servicios de la API de whodrugs
 */
@Injectable()
export class WhoDrugsClientService {
  //
  private readonly logger = new Logger(WhoDrugsClientService.name);

  constructor(private readonly httpService: HttpService) {}

  /**
   * Obtiene todos los datos desde la API de whodrugs
   * @returns
   */
  public async getDrugs(level: number, ingredientTraslations: string, includeAtc: boolean): Promise<IDrug[]> {
    try {
      console.log(includeAtc, ingredientTraslations, level);

      const { data } = await firstValueFrom(
        this.httpService.get(
          `/whodrug/download/v2/regional-drugs?MedProdLevel=${level}&IngredientTranslations=${ingredientTraslations}&IncludeAtc=${includeAtc}`,
        ),
      );
      return data;
    } catch (e) {
      this.logger.error(e);
      throw e;
    } finally {
      this.logger.log('Descarga de archivo completada');
    }
  }
}
