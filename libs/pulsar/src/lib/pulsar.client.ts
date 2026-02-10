import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client } from 'pulsar-client';
@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client: Client;

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }

  async createProducer(topic: string) {
    return await this.client.createProducer({
      topic,
    });
  }

  async onModuleDestroy() {
    await this.client.close();
  }
}
