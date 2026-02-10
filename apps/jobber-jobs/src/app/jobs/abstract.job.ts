export abstract class AbstractJob {
  async execute() {
    console.log(`Executing job: ${this.constructor.name}`);
  }
}
