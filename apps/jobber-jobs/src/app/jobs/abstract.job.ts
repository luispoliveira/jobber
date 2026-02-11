import { PulsarClient, serialize } from '@jobber/pulsar';
import { BadRequestException } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { Producer } from 'pulsar-client';
export abstract class AbstractJob<T extends object> {
  private producer: Producer;
  protected abstract messageClass: new () => T;

  constructor(private readonly pulsarClient: PulsarClient) {}

  async execute(data: T | T[], job: string) {
    await this.validateData(data);
    if (!this.producer) {
      this.producer = await this.pulsarClient.createProducer(job);
    }

    if (Array.isArray(data)) {
      for (const message of data) {
        await this.send(message);
      }
      return;
    }

    await this.send(data);
  }

  private async send(data: T) {
    await this.producer.send({
      data: serialize(data),
    });
  }

  private async validateData(data: T | T[]) {
    const instances = plainToInstance(this.messageClass, data);
    const errors = Array.isArray(instances)
      ? (await Promise.all(instances.map((item) => validate(item)))).flat()
      : await validate(instances);

    if (errors.length) {
      throw new BadRequestException(
        `Job data validation failed: ${JSON.stringify(errors)}`,
      );
    }
  }
}
