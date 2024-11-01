import { Injectable, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { createHash } from 'node:crypto';
import { Repository } from 'typeorm';
import { ActiveIngredient } from '../models/activeIngredient.entity';
import { AnatomicalTherapeuticChemical } from '../models/atomicTerapeutalChemical.entity';
import { DrugSchemaAdapter } from '../models/builders/drug.build';
import { CountryOfSale } from '../models/countryOfSale.entity';
import { Drug } from '../models/drug.entity';
import { DrugSync, DrugSyncBuilder } from '../models/drugSync.entity';
import { IDrugResponse } from '../models/dtos/drug.dto';
import { IngredientTranslation } from '../models/ingredientTranslation.entity';
import { Maholder } from '../models/maholder.entity';
import { SyncStateEnum } from '../utils/sycnstate.enum';
import { uuidGenerator } from '../utils/utils';
import { WhoDrugsClientService } from './whodrugs-client.service';
import { Cron, CronExpression } from '@nestjs/schedule';
import { formatDate } from 'date-fns';

const cliProgress = require('cli-progress');

/**
 * Esta clase se encargará de la sincronización del json proporcionado por whodrug en la base de datos postgres
 */
@Injectable()
export class WhoDrugsSyncService {
  constructor(
    private readonly whoDrugsClientService: WhoDrugsClientService,

    @InjectRepository(Drug, 'who_drug')
    private readonly drugRepository: Repository<Drug>,

    @InjectRepository(DrugSync, 'who_drug')
    private readonly drugSyncRepository: Repository<DrugSync>,

    @InjectRepository(ActiveIngredient, 'who_drug')
    private readonly activeIngredientsRepository: Repository<ActiveIngredient>,

    @InjectRepository(IngredientTranslation, 'who_drug')
    private readonly ingredientTranslationRepository: Repository<IngredientTranslation>,

    @InjectRepository(CountryOfSale, 'who_drug')
    private readonly countrySaleRepository: Repository<CountryOfSale>,

    @InjectRepository(AnatomicalTherapeuticChemical, 'who_drug')
    private readonly anatomicalTherapeuticChemicalRepository: Repository<AnatomicalTherapeuticChemical>,

    @InjectRepository(Maholder, 'who_drug')
    private readonly maholderRepository: Repository<Maholder>,
  ) {}

  private readonly logger = new Logger(WhoDrugsSyncService.name);

  /**
   * Este método se encarga de sincronizar el json proporcionado por whodrug en la base de datos postgres
   * @returns
   */
  public async sync(): Promise<void> {
    try {
      // Obtener la sincronización
      this.logger.log('Iniciando sincronización, descargando archivo de whodrugs');
      //
      const drugsResponse = await this.whoDrugsClientService.getDrugs(3, 'es-ES', true);
      const sha256 = createHash('sha256').update(JSON.stringify(drugsResponse)).digest('hex');

      // Verificar si hay actualizaciones
      const existe = await this.getDrugSyncBySHA(sha256);
      if (!existe) {
        // Procesar la sincronización
        const drugSync = await this.createDrugSync(sha256);
        this.logger.log(`Syncronización iniciada ${drugSync.id} a las ${drugSync.startSyncDate}`);
        await this.saveDrugs(drugsResponse, drugSync);
        this.logger.log(`Syncronización finalizada ${drugSync.id} a las ${drugSync.endSyncDate}`);
      }
    } catch (e) {
      this.logger.error(`Error al procesar la sincronización ${e.message}`);
      throw e;
    } finally {
      this.logger.log('Proceso Finalizado');
    }
  }

  /**
   *
   * Task to run every 10 minutes, to check if exist a new version of whodrugs
   * @returns
   */
  @Cron(CronExpression.EVERY_DAY_AT_1AM, { name: 'askExistNewVersion' })
  async existNewVersion(): Promise<boolean> {
    this.logger.log(
      `Consultando si existe una nueva versión de whodrugs ${formatDate(new Date(), 'yyyy-MM-dd HH:mm:ss')}`,
    );
    const drugsResponse = await this.whoDrugsClientService.getDrugs(3, 'es-ES', true);
    const sha256 = createHash('sha256').update(JSON.stringify(drugsResponse)).digest('hex');

    if (await this.getDrugSyncBySHA(sha256)) {
      // TODO: IMPLEMENTAR UN ENVIADOR DE MAIL.
      this.logger.log('Existe una nueva versión de whodrugs ${}');
      return true;
    }
    this.logger.log('No hay nuevas actualizaciones');
    return false;
  }

  /**
   *
   * @param drugs
   * @param drugSync
   */
  private async saveDrugs(drugs: IDrugResponse[], drugSync: DrugSync): Promise<void> {
    await this.disableEntities();

    const drugsEntities = [];
    //1
    let activeIngredientsEntities = [];
    let ingredientTranslationsEntities = [];
    //2
    let countryOfSalesEntities = [];
    let maholdersEntities = [];
    //3
    let atcsEntities = [];
    const bar1 = new cliProgress.SingleBar({}, cliProgress.Presets.shades_classic);

    bar1.start(drugs.length, 1);
    (drugs || []).forEach((drugR, index) => {
      bar1.update(index);
      const drugAdapter = new DrugSchemaAdapter(drugR, drugSync);
      const { drug, activeIngredients, ingredientTranslations, countryOfSales, maholders, atcs } =
        drugAdapter.getEntities();
      drugsEntities.push(drug);
      //1
      activeIngredientsEntities = activeIngredientsEntities.concat(activeIngredients);

      ingredientTranslationsEntities = ingredientTranslationsEntities.concat(ingredientTranslations);
      //2
      countryOfSalesEntities = countryOfSalesEntities.concat(countryOfSales);
      maholdersEntities = maholdersEntities.concat(maholders);
      //3
      atcsEntities = atcsEntities.concat(atcs);
    });
    bar1.stop();
    await this.saveEntitiesGeneric<Drug>(this.drugRepository, drugsEntities, Drug.name);
    await this.saveEntitiesGeneric<ActiveIngredient>(
      this.activeIngredientsRepository,
      activeIngredientsEntities,
      ActiveIngredient.name,
    );
    await this.saveEntitiesGeneric<IngredientTranslation>(
      this.ingredientTranslationRepository,
      ingredientTranslationsEntities,
      IngredientTranslation.name,
    );
    await this.saveEntitiesGeneric<CountryOfSale>(
      this.countrySaleRepository,
      countryOfSalesEntities,
      CountryOfSale.name,
    );
    await this.saveEntitiesGeneric<Maholder>(this.maholderRepository, maholdersEntities, Maholder.name);
    await this.saveEntitiesGeneric<AnatomicalTherapeuticChemical>(
      this.anatomicalTherapeuticChemicalRepository,
      atcsEntities,
      AnatomicalTherapeuticChemical.name,
    );
    //
    await this.updateDrugSync(drugSync);
  }
  /*
   *
   */
  private async createDrugSync(sha256: string): Promise<DrugSync> {
    try {
      const drugSync = new DrugSyncBuilder()
        .setEnabled(true)
        .setState(true)
        .setStartSyncDate(new Date())
        .setId(uuidGenerator(11))
        .setProccesId(uuidGenerator(11))
        .setEndSyncDate(null)
        .setSha256(sha256)
        .setSyncStatus(SyncStateEnum.STARTED)
        .build();
      return await this.drugSyncRepository.save(drugSync);
    } catch (e) {
      this.logger.error(e);
      throw e;
    }
  }

  /**
   *
   * @param drugSync
   * @returns
   */
  private async updateDrugSync(drugSync: DrugSync) {
    try {
      drugSync.endSyncDate = new Date();
      drugSync.syncStatus = SyncStateEnum.FINISHED;
      return await this.drugSyncRepository.save(drugSync);
    } catch (e) {
      this.logger.error(e);
      throw e;
    } finally {
      this.logger.log('Sincronización Finalizada');
    }
  }

  /**
   *
   * @param sha256
   * @returns
   */
  private async getDrugSyncBySHA(sha256: string): Promise<boolean> {
    return await this.drugSyncRepository.exists({
      where: { sha256: sha256 },
    });
  }
  /**
   *
   * @param entities
   * @returns
   */
  public async saveEntitiesGeneric<T>(repositorySaver: Repository<T>, entities: T[], entityName: string): Promise<T[]> {
    let page = 0;
    const size = 5000;
    const fullEntitiesSaved: T[] = [];
    this.logger.log(`Total: ${entities.length} entidades de ${entityName}`);
    do {
      const entitiesToSave = entities.slice(page * size, (page + 1) * size);
      this.logger.log(`|---- Guardado  de ${page * size} a ${(page + 1) * size}`);
      let entitiesSaved = [];
      entitiesSaved = await repositorySaver.save(entitiesToSave);
      fullEntitiesSaved.push(...entitiesSaved);
      page++;
    } while (entities.length > page * size);
    //
    return fullEntitiesSaved;
  }
  /**
   *
   */
  public async disableEntities() {
    this.logger.log('Actualizando estados');
    this.updateEntitiesStates<DrugSync>(this.drugSyncRepository, DrugSync.name);
    this.updateEntitiesStates<Drug>(this.drugRepository, Drug.name);
    this.updateEntitiesStates<ActiveIngredient>(this.activeIngredientsRepository, ActiveIngredient.name);
    this.updateEntitiesStates<IngredientTranslation>(this.ingredientTranslationRepository, IngredientTranslation.name);
    this.updateEntitiesStates<CountryOfSale>(this.countrySaleRepository, CountryOfSale.name);
    this.updateEntitiesStates<Maholder>(this.maholderRepository, Maholder.name);

    this.updateEntitiesStates<AnatomicalTherapeuticChemical>(
      this.anatomicalTherapeuticChemicalRepository,
      AnatomicalTherapeuticChemical.name,
    );
  }

  /**
   *
   * @param repositoryUpdater
   * @param entityName
   */
  public async updateEntitiesStates<T>(repositoryUpdater: Repository<T>, entityName: string) {
    this.logger.log('Actualizando estados de ' + entityName);
    repositoryUpdater
      .createQueryBuilder()
      .update(entityName)
      .set({ enabled: true, state: true })
      .where('enabled = :enabled', { enabled: false })
      .orWhere('state =:state', { state: false });
  }
}
