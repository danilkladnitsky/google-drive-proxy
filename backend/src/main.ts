import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AuthFilter } from './common/filter/auth.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new AuthFilter());
  await app.listen(3000);
}

bootstrap();
