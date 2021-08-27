import Component from '@glimmer/component';
import { action } from '@ember/object';
import { dropTask, task, timeout } from 'ember-concurrency';
import { inject as service } from '@ember/service';
import { tracked } from '@glimmer/tracking';
export default class extends Component {
  @service counter;
  @tracked showButtons = true;

  // local tasks/actions
  @task *countToTenTask() {
    // eslint-disable-next-line no-unused-vars
    for (let i of new Array(10)) {
      yield timeout(1000);
      this.counter.increment();
    }
  }

  @task *countToTenLocalWrapperTask() {
    yield this.countToTenTask.perform();
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

  // incoming tasks/actions
  @dropTask *countToTenWrapperTask() {
    yield this.args.countToTenTask.perform();
  }

  @dropTask *countToTenActionWrappedIntoTask() {
    yield this.args.countToTenAction();
  }

  @action countToTenTaskWrappedIntoAction() {
    this.args.countToTenTask.perform();
  }

  @action toggleButtons() {
    this.showButtons = !this.showButtons;
  }
}
