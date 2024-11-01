import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { WhiteListCorsService } from './apiGateway/services/whitelistcors.service';

async function bootstrap() {
  // SERVER DEFINITION
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'debug', 'log', 'verbose'],
    bufferLogs: true,
  });

  // PIPES
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      forbidNonWhitelisted: true,
    }),
  );

  // VESIONING SETUP
  app.enableVersioning({
    type: VersioningType.URI,
  });

  // SWAGGER SETUP
  const config = new DocumentBuilder()
    .setTitle('DHIS2  API GATEWAY')
    .setDescription('Herramientas de integración de DHIS2 con sistemas externos')
    .setVersion('1.0')
    .addServer('http://localhost:3000', 'Local')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  // CORS
  const whiteListCorsService = app.get(WhiteListCorsService);
  const whitelist = await whiteListCorsService.getWhitelist();
  app.enableCors({
    origin: whitelist,
  });
  // RUN SERVER
  await app.listen(process.env.APP_PORT, () =>
    console.log(`Server running on port ${process.env.APP_PORT}, configuación de ambiente ${process.env.ENV}`),
  );
}

bootstrap();
