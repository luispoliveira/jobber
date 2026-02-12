import { DiscoveryModule } from '@golevelup/nestjs-discovery';
import { PulsarModule } from '@jobber/pulsar';
import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { AUTH_PACKAGE_NAME } from '@jobber/grpc';
import { join } from 'node:path';
import { JobsResolver } from './jobs.resolver';
import { JobsService } from './jobs.service';
import { FibonacciJob } from './jobs/fibonacci/fibonacci.job';

@Module({
  imports: [
    DiscoveryModule,
    PulsarModule,
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
