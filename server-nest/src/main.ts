import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));
    app.enableCors();

    const port = Number(process.env.PORT ?? 3000);
    console.log(`[bootstrap] starting on port ${port}`);
    await app.listen(port);
    console.log(`[bootstrap] listening on http://127.0.0.1:${port}`);
}

bootstrap();
