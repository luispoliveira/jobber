import { init } from '@jobber/nestjs';
/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import { AUTH_PACKAGE_NAME } from '@generated/proto-auth';
import { NestFactory } from '@nestjs/core';
import { GrpcOptions, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await init(app);

  app.connectMicroservice<GrpcOptions>({
    transport: Transport.GRPC,
    options: {
      package: AUTH_PACKAGE_NAME,
      protoPath: join(__dirname, 'proto/auth.proto'),
    },
  });

  await app.startAllMicroservices();
}

bootstrap();
