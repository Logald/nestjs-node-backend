import { ValidationPipe } from '@nestjs/common'
import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap () {
  const app = await NestFactory.create(AppModule)
  const config = new DocumentBuilder()
    .setTitle('Tecnicatura 2022 Backend Node')
    .setDescription('Backend')
    .setVersion('1.0')
    .addBearerAuth()
    .addTag('users')
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
    .build()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document, {
    explorer: true,
    swaggerOptions: {
      filter: true
    }
  })
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,
    forbidNonWhitelisted: true
  }))
  await app.listen(3000)
}
bootstrap()
