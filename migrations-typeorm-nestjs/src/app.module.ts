import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';
import { ConfigurationModule } from './config/config.module';

@Module({
  imports: [
    ConfigurationModule,
    DatabaseModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
