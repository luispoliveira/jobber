import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Client, Consumer, Message, Producer } from 'pulsar-client';
@Injectable()
export class PulsarClient implements OnModuleDestroy {
  private readonly client: Client;
  private readonly producers: Producer[] = [];
  private readonly consumers: Consumer[] = [];

  constructor(private readonly configService: ConfigService) {
    this.client = new Client({
      serviceUrl: this.configService.getOrThrow<string>('PULSAR_SERVICE_URL'),
    });
  }

  async createProducer(topic: string) {
    const producer = await this.client.createProducer({
      topic,
    });
    this.producers.push(producer);
    return producer;
  }

  async createConsumer(topic: string, listener: (message: Message) => void) {
    const consumer = await this.client.subscribe({
      topic,
      subscription: `${topic}-subscription`,
      subscriptionType: 'Shared',
      listener,
    });
    this.consumers.push(consumer);
    return consumer;
  }

  async onModuleDestroy() {
    for (const producer of this.producers) {
      await producer.close();
    }
    await this.client.close();
  }
}
