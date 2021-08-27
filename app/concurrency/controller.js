import Controller from '@ember/controller';
import { task, timeout } from 'ember-concurrency';
import { tracked } from '@glimmer/tracking';

import { action } from '@ember/object';
import { inject as service } from '@ember/service';

export default class ConcurrencyController extends Controller {
  @service counter;

  @tracked showButtons = true;

  @task *countToTenTask() {
    for (let i of new Array(10)) {
      console.log(i);
      yield timeout(1000);
      this.counter.increment();
    }
  }

  @action async countToTenAction() {
    for (let i of new Array(10)) {
      console.log(i);
      await new Promise((resolve) =>
        setTimeout(() => {
          this.counter.increment();
          resolve();
        }, 1000)
      )
    }
  }

  @action toggleButtons() {
    this.showButtons = !this.showButtons;
  }

  deactivate() {
    this.countToTenTask.cancelAll();
  }
}
