import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());

  // Habilita CORS para o frontend em localhost:3000
  app.enableCors({
    origin: 'http://localhost:3000', // URL do seu frontend
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // se precisar enviar cookies
  });
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
