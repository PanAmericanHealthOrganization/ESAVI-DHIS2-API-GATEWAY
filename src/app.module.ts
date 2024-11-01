import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ApiGatewayModule } from './apiGateway/apigateway.module';
import { MeddraModule } from './meddra/meddra.module';
import { IpFilterMiddleware } from './middleware/ipMiddleware';
import { WhodrugsModule } from './whodrugs/whodrugs.module';
import { Dhis2ClientModule } from './dhis2Client/dhis2Client.module';
/**
 * @description Main module of the application
 */
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    Dhis2ClientModule,
    MeddraModule,
    WhodrugsModule,
    ApiGatewayModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(IpFilterMiddleware).forRoutes('*');
  }
}
