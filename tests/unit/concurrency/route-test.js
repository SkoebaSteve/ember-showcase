import { module, test } from 'qunit';
import { setupTest } from 'ember-qunit';

module('Unit | Route | concurrency', function(hooks) {
  setupTest(hooks);

  test('it exists', function(assert) {
    let route = this.owner.lookup('route:concurrency');
    assert.ok(route);
  });
});
