import { Controller, Post, Query } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { WhoDrugsAsAnyService } from '../services/whodrugasany.service';
import { WhoDrugsSyncService } from '../services/whodrugs-sync.service';

/**
 *
 */
@ApiTags('Who Drug')
@Controller({ path: 'whodrug', version: '1' })
export class WhodrugsSyncController {
  constructor(
    private readonly whoDrugsSincService: WhoDrugsSyncService,
    private readonly whoDrugAsAnyService: WhoDrugsAsAnyService,
  ) {}

  /**
   *
   */
  @Post('/sync')
  @ApiOperation({
    summary: 'Dispara el proceso de sincronización de whodrugs,',
    description:
      'Realiza la sincronización con whodrug con la base de datos postgres, este proceso puede tomar mucho tiempo, se recomienda no realizarlo en horas pico.',
  })
  public async sync(): Promise<any> {
    this.whoDrugsSincService.sync();
  }

  /**
   *
   */
  @Post('/as/dhis2-optionset')
  @ApiOperation({
    summary: 'Obtiene la lista de opciones para dhis2, es neceario proporcionar el pais ,',
    description: 'Genera la el optionsets para la importación en DHIS2',
  })
  public async asDHIS2OptionSet(
    @Query('country') country: string,
    @Query('atcCode') atcCode: string,
    @Query('optionSetName')
    optionSetName: string = 'Ponga aqui el nombre del OptionSet',
  ): Promise<any> {
    if (['', undefined, null].includes(country)) {
      throw new Error('country is required');
    }
    return this.whoDrugAsAnyService.asDHHIS2OptionSet({
      country,
      atcCode,
      optionSetName,
    });
  }
}
