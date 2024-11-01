import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true })],
  providers: [ConfigModule],
  exports: [ConfigModule],
  controllers: [],
})
export class SettingsModule {}
