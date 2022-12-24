import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthFilter } from './common/filter/auth.filter';
import { DriveManagerProvider } from './providers/storageManagers/drive/driveManager.provider';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AuthFilter(new DriveManagerProvider()));

  await app.listen(process.env.BACKEND_PORT);
}

bootstrap();
