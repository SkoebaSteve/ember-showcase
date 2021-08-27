import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class CounterService extends Service {
  @tracked counter = 0;

  decrement() {
    this.counter--;
  }
  increment() {
    this.counter++;
  }
}
