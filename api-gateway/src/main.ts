// api-gateway/src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // --- AÑADE ESTA LÍNEA ---
  app.enableCors();
  // -------------------------

  await app.listen(8000); // Puerto del Gateway
}
void bootstrap();