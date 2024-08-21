import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PrismaService } from './prisma.service';
import { configure } from './__shared__/config/config';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  await prismaService.enableShutdownHook(app);
  prismaService.applyPrismaMiddleware();

  configure(app);

  //const port = app.get(ConfigService).get('port');
  await app.listen(8080);
}
bootstrap();
