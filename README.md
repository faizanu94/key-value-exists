# key-value-exists
> Returns existence of key or value in an object

## Install

```
$ npm install key-value-exists
```

## Usage

```js
const keyValueExists = require('key-value-exists');

keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'foo');
//=> true

keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'zoo');
//=> false

keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, 'foobaz', {deep: true});
//=> true

keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, {foobaz: true}, {deep: true});
//=> true

keyValueExists({foo: true, bar: {baz: {foobaz: true}}, foobar: {barbaz: true}}, {foobaz: false}, {deep: true});
//=> false
```

## API

### keyValueExists(object, target, options?)

#### object

Type: `object`

Source object to traverse

#### target

Type: `any`

Value to be searched

#### options

Type: `object`

##### deep

Type: `boolean`\
Default: `false`

Recurse nested objects and objects in arrays