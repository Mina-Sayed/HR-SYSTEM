import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { HttpExceptionFilter } from './filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'https://hr-system-fawn.vercel.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  // Global validation pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );

  // Global exception filter
  app.useGlobalFilters(new HttpExceptionFilter());

  // Swagger setup with production URL
  const config = new DocumentBuilder()
    .setTitle('HR System API')
    .setDescription('The HR system API documentation')
    .setVersion('1.0')
    .addBearerAuth()
    .addServer('https://hr-system-backend-one.vercel.app') // Add production server
    .build();
  
  const document = SwaggerModule.createDocument(app, config);
  
  // Enable Swagger UI in production
  SwaggerModule.setup('api', app, document, {
    customSiteTitle: 'HR System API Documentation',
    customfavIcon: 'https://hr-system-fawn.vercel.app/logo.svg',
    customJs: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui-bundle.min.js',
    ],
    customCssUrl: [
      'https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.15.5/swagger-ui.min.css',
    ],
  });

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`Application is running on port: ${port}`);
}
bootstrap();
