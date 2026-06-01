/* eslint-disable @typescript-eslint/no-floating-promises */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { PORT } from './config';

async function bootstrap() {
  console.log('PORT =', process.env.PORT);
  console.log('APPLICATION_NAME =', process.env.APPLICATION_NAME);
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  console.log(`Server is running on Port ${PORT} 🚀`);
}
bootstrap();
