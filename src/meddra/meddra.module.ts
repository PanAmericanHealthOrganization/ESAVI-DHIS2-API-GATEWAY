import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { CacheModule, CacheInterceptor } from '@nestjs/cache-manager';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SettingsModule } from 'src/settings/settings.module';
import { AutoEncryptSubscriber } from 'typeorm-encrypted/lib/subscribers/AutoEncryptSubscriber';
import { MeddraController } from './controllers/meddra.controller';
import { MeddraQuery } from './models/meddraquerys.entity';
import { MeddraClientService } from './services/meddra-client.service';
import { MeddraHistoryService } from './services/meddra-history.service';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { LLT } from './models/standar/llt.entity';
import { PT } from './models/standar/pt.entity';
import { SOC } from './models/standar/soc.entity';
import { MappingDefinition } from './models/mapping/mappingDefinition.entity';
import { Mappings } from './models/mapping/mappings.entity';
import { MeddraStandarService } from './services/meddra-standar.service';
import { cie10Meddra } from './models/mapping/cie19meddra.entity';
import { CIE10ES } from './models/standar/cie_19.entity';
import { MeddraVersionController } from './controllers/meddra.version.controller';
import { MeddraProcessFilesService } from './services/meddra-process.service';
import { MeddraSync } from './models/standar/meddraSync.entity';

export const MEDDRA_DS = 'meddra';
@Module({
  imports: [
    CacheModule.register(),
    SettingsModule,
    TypeOrmModule.forRootAsync({
      name: MEDDRA_DS,
      useFactory: (configService: ConfigService) => ({
        name: MEDDRA_DS,
        type: 'postgres',
        host: configService.get('MDD_DB_HOST'),
        port: +configService.get('MDD_DB_PORT'),
        username: configService.get('MDD_DB_USER'),
        password: configService.get('MDD_DB_PASS'),
        database: configService.get('MDD_DB_NAME'),
        entities: [
          'dist/**/models/*.entity{.ts,.js}',
          'dist/**/models/mapping/*.entity{.ts,.js}',
          'dist/**/models/standar/*.entity{.ts,.js}',
        ],
        schema: MEDDRA_DS,
        synchronize: configService.get('ENV') === 'DEV',
        subscribers: [AutoEncryptSubscriber],
        poolSize: 5,
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature(
      [MeddraQuery, LLT, PT, SOC, MappingDefinition, Mappings, cie10Meddra, CIE10ES, MeddraSync],
      MEDDRA_DS,
    ),
    HttpModule,
  ],
  providers: [
    MeddraClientService,
    MeddraStandarService,
    MeddraHistoryService,
    MeddraProcessFilesService,
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
  ],
  controllers: [MeddraController, MeddraVersionController],
})
export class MeddraModule {}
