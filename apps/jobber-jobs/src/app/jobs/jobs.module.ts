import { AUTH_PACKAGE_NAME } from '@generated/proto-auth';
import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'node:path';
import { FibonacciJob } from './fibonacci.job';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
@Module({
  imports: [
    DiscoveryModule,
    ClientsModule.register([
      {
        name: AUTH_PACKAGE_NAME,
        transport: Transport.GRPC,
        options: {
          package: AUTH_PACKAGE_NAME,
          protoPath: join(__dirname, 'proto/auth.proto'),
        },
      },
    ]),
  ],
  providers: [FibonacciJob, JobsService, JobsResolver],
})
export class JobsModule {}
