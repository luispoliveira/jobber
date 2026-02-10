import { Job } from '../decorators/job.decorator';
import { AbstractJob } from './abstract.job';

@Job({
  name: 'Fibonacci',
  description: 'Calculates Fibonacci numbers up to a certain limit.',
})
export class FibonacciJob extends AbstractJob {}
