const test = require('ava');
const { Metadata, RollMetadata, _RollMetadata } = require('../lib/dice-common');

test('my passing test', t => {
  t.pass();
});

test('[2,1]', t => {
  const md = new RollMetadata([2,1]);
  t.deepEqual( md, new _RollMetadata([1,2], [1,2], 3) );
});