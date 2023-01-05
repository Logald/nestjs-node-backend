import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /* const config = new DocumentBuilder()
    .setTitle('Tecnicatura 2022 Backend Node')
    .setDescription('Backend')
    .setVersion('1.0')
    .addTag('absences')
    .addTag('gmps')
    .addTag('groups')
    .addTag('matters')
    .addTag('mgs')
    .addTag('people')
    .addTag('proffessors')
    .addTag('profiles')
    .addTag('specialities')
    .addTag('turns')
    .addTag('users')
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true
    }
  }) */
  await app.listen(3000);
}
bootstrap();
