import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from 'src/settings/settings.module';
import { AutoEncryptSubscriber } from 'typeorm-encrypted/lib/subscribers/AutoEncryptSubscriber';
import { MaholderController } from './controllers/maholder.controller';
import { WhodrugsController } from './controllers/whodrugs.controller';
import { WhodrugsSyncController } from './controllers/whodrugs.sync.controller';
import { ActiveIngredient } from './models/activeIngredient.entity';
import { AnatomicalTherapeuticChemical } from './models/atomicTerapeutalChemical.entity';
import { CountryOfSale } from './models/countryOfSale.entity';
import { Drug } from './models/drug.entity';
import { DrugSync } from './models/drugSync.entity';
import { IngredientTranslation } from './models/ingredientTranslation.entity';
import { Maholder } from './models/maholder.entity';
import { ActiveIngredientsService } from './services/activeIngredients.service';
import { AnatomicalTherapeuticChemicalService } from './services/anatomicalTherapeuticChemical.service';
import { CountryOfSaleService } from './services/countryofsale.service';
import { DrugService } from './services/drugs.service';
import { IngredientTranslationService } from './services/ingredientsTraslations.service';
import { MaholderService } from './services/maholder.service';
import { WhoDrugsAsAnyService } from './services/whodrugasany.service';
import { WhoDrugsClientService } from './services/whodrugs-client.service';
import { WhoDrugsSyncService } from './services/whodrugs-sync.service';
import { ScheduleModule } from '@nestjs/schedule';

export const WHODRUGS_DS = 'who_drug';
@Module({
  imports: [
    SettingsModule,
    ScheduleModule.forRoot(),
    TypeOrmModule.forRootAsync({
      name: WHODRUGS_DS, // a
      useFactory: (configService: ConfigService) => ({
        name: WHODRUGS_DS, // a
        type: 'postgres',
        host: configService.get('WHD_DB_HOST'),
        port: +configService.get('WHD_DB_PORT'),
        username: configService.get('WHD_DB_USER'),
        password: configService.get('WHD_DB_PASS'),
        database: configService.get('WHD_DB_NAME'),
        schema: WHODRUGS_DS, // a
        entities: ['dist/**/models/*.entity{.ts,.js}'],
        synchronize: configService.get('ENV') === 'DEV',
        subscribers: [AutoEncryptSubscriber],
        poolSize: 5,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(
      [DrugSync, Drug, ActiveIngredient, IngredientTranslation, AnatomicalTherapeuticChemical, CountryOfSale, Maholder],
      WHODRUGS_DS,
    ),
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        timeout: 120000,
        maxRedirects: 5,
        baseURL: configService.get('WHD_API_URL'),
        // se agrega infinity por el crecimiento del archivo
        maxContentLength: Infinity,
        withCredentials: true,
        headers: {
          'umc-license-key': configService.get('WHD_UMC_LICENSE_KEY'),
          'umc-client-key': configService.get('WHD_UMC_CLIENT_KEY'),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    ActiveIngredientsService,
    AnatomicalTherapeuticChemicalService,
    CountryOfSaleService,
    DrugService,
    IngredientTranslationService,
    MaholderService,
    WhoDrugsClientService,
    WhoDrugsSyncService,
    WhoDrugsAsAnyService,
  ],
  controllers: [WhodrugsController, WhodrugsSyncController, MaholderController],
})
export class WhodrugsModule {}
