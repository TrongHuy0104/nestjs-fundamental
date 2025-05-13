import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { SeedService } from './seed/seed.service';
import { ConfigService } from '@nestjs/config';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  // await seedService.seed();
  // const seedService = app.get(SeedService);
  const port = configService.get<number>('port') || 3000;
  await app.listen(port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
