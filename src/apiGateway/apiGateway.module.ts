import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';
import { SettingsModule } from 'src/settings/settings.module';
import { NotificationController } from './controllers/notification.controller';
import { ParamController } from './controllers/param.controller';
import { Parameter } from './models/parameter.entity';
import { WhiteListCors } from './models/whitelist.entity';
import { NotificationService } from './services/notification.service';
import { TelegramService } from './services/telegram.service';
import { WhiteListCorsService } from './services/whitelistcors.service';
import { Notification } from './models/notification.entity';
import { ParameterService } from './services/parameter.service';
import { JwtModule } from '@nestjs/jwt';
import { User } from './models/user.entity';
import { UserRol } from './models/userrol.entity';
import { Rol } from './models/rol.entity';
import { AuthController } from './controllers/auth.controller';
import { AuthService } from './services/auth.service';
//
export const PARAMS_DS = 'api_gateway';
/**
 *
 */
@Module({
  imports: [
    SettingsModule,
    MailerModule.forRootAsync({
      useFactory: async (config: ConfigService) => ({
        transport: {
          host: config.get('GTW_EMAIL_HOST'),
          port: config.get('GTW_EMAIL_PORT'),
          secure: false,
          auth: {
            user: config.get('GTW_EMAIL_USER'),
            pass: config.get('GTW_EMAIL_PASS'),
          },
        },
        defaults: {
          from: `"No Reply" <${config.get('GTW_EMAIL_FROM')}>`,
        },
        template: {
          dir: join(__dirname, 'templates', 'email'),
          adapter: new HandlebarsAdapter(),
          options: {
            strict: false,
          },
        },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      name: PARAMS_DS,
      useFactory: (configService: ConfigService) => ({
        name: PARAMS_DS,
        type: 'postgres',
        host: configService.get('GTW_DB_HOST'),
        port: +configService.get('GTW_DB_PORT'),
        username: configService.get('GTW_DB_USER'),
        password: configService.get('GTW_DB_PASS'),
        database: configService.get('GTW_DB_NAME'),
        schema: PARAMS_DS,
        entities: ['dist/**/models/*.entity{.ts,.js}'],
        synchronize: configService.get('ENV') === 'DEV',
      }),
      imports: [ConfigModule],
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Parameter, WhiteListCors, Notification, User, UserRol, Rol], PARAMS_DS),
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [WhiteListCorsService, NotificationService, TelegramService, ParameterService, AuthService],
  exports: [WhiteListCorsService, NotificationService, TelegramService, ParameterService, AuthService],
  controllers: [ParamController, NotificationController, AuthController],
})
export class ApiGatewayModule {}
