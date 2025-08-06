// users-service/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common'; // <-- ¡Asegúrate de que esto esté importado!

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  // --- ESTA ES LA PARTE CRÍTICA ---
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  // ------------------------------------

  await app.listen(8001); // Puerto para el servicio de usuarios
}
bootstrap();