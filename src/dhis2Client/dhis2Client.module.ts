import { HttpModule } from '@nestjs/axios/dist/http.module';
import { Global, Module } from '@nestjs/common';
import { ExtensionController } from './controllers/extension.controller';
import { Dhis2EventsService } from './services/dhis2-events.service';
import { Dhis2ProgramService } from './services/dhis2-program.service';
import { Dhis2ResourceService } from './services/dhis2-resource.service';
import { ExtensionService } from './services/extension.service';
import { InformesService } from './services/informes.service';
import { InformesController } from './controllers/informes.controller';

@Global()
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000,
      maxRedirects: 5,
      baseURL: 'https://dev.paho-dhis2.org/',
      auth: {
        username: 'rcasigna',
        password: 'Userdhis2.',
      },
    }),
  ],
  exports: [],
  providers: [Dhis2ResourceService, Dhis2EventsService, ExtensionService, Dhis2ProgramService, InformesService],
  controllers: [ExtensionController, InformesController],
})
export class Dhis2ClientModule {}
