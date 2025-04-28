import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './data-source';

async function bootstrap() {
  // Run migrations
  await AppDataSource.initialize()
    .then(() => AppDataSource.runMigrations())
    .catch((error) => console.log('Migration error:', error));
  const app = await NestFactory.create(AppModule);
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
