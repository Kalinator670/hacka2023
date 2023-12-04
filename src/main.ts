import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import cookie from '@fastify/cookie';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const bootstrap = async (): Promise<void> => {
  const fastifyAdapter = new FastifyAdapter();
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    fastifyAdapter,
  );

  app.enableCors();
  app.setGlobalPrefix('api/v1');
  const logger = new Logger('Bootstrap');

  const documentConfig = new DocumentBuilder()
    .setTitle('Hackaton2023 api ')
    .setDescription('Potom opishu')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'JWT' },
      'JWT',
    )
    .setVersion('1.0')
    .build();

  SwaggerModule.setup(
    'docs',
    app,
    SwaggerModule.createDocument(app, documentConfig),
  );

  await app.register(cookie);

  await app.listen(3000, '0.0.0.0', () => {
    logger.debug('Service start on 0.0.0.0:3000');
  });
};

bootstrap();
