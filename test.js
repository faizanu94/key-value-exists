const test = require('ava');
const keyValueExists = require('.');

test('shallow primitives', t => {
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'foo'));
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, true));
	t.true(keyValueExists({foo: false, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, false));
	t.true(keyValueExists({foo: 1, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 1));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'zoo'));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, false));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, false));
	t.false(keyValueExists({foo: 1, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 2));
});

test('shallow objects', t => {
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, {baz: {foobaz: true}}));
	t.false(keyValueExists({foo: 1, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, {foobaz: true}));
});

test('deep primitives', t => {
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'foobaz', {deep: true}));
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: false}}, foobar: {barbaz: true}}, false, {deep: true}));
	t.true(keyValueExists({foo: false, bar: {baz: {foobaz: true}}, foobar: {barbaz: false}}, true, {deep: true}));
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: 1}}, foobar: {barbaz: true}}, 1, {deep: true}));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'zoo', {deep: true}));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, false, {deep: true}));
	t.false(keyValueExists({foo: false, bar: {baz: {foobaz: false}}, foobar: {barbaz: false}}, true, {deep: true}));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: 1}}, foobar: {barbaz: true}}, 2, {deep: true}));
});

test('deep objects', t => {
	t.true(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, {foobaz: true}, {deep: true}));
	t.false(keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, {foobaz: false}, {deep: true}));
});

test('throws', t => {
	t.throws(() => {
		keyValueExists('foo', 'foo');
	}, {instanceOf: TypeError, message: 'Expected an object, got `foo` (string)'});
});
