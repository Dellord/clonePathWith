# clonePathWith

## Installation

Using npm:
```shell
$ npm i clonepathwith --save
```

## Usage
#### Simple clone
```js
import clonePathWith from 'clonepathwith';

let someObject = {someArray:[], innerObject: {text: 'Hello World!'}};
let clone = clonePathWith(someObject, 'innerObject.text');
console.log(clone === someObject); // false
console.log(clone.someArray === someObject.someArray); // true
console.log(clone.innerObject === someObject.innerObject); // false
```
#### Updated clone
```js
import clonePathWith from 'clonepathwith';

let helloWorldObject = {
    before: {text: 'before'},
    hello: {world: {text: 'Hello'}},
    after: {text: 'after'}
};

let clone = clonePathWith(helloWorldObject, 'hello.world.text', (text) => {
    return text + ' World!';
});

console.log(clone.before === helloWorldObject.before); // true
console.log(clone.after === helloWorldObject.after); // true

console.log(clone === helloWorldObject); // false
console.log(clone.hello === helloWorldObject.hello); // false
console.log(clone.hello.world === helloWorldObject.hello.world); // false
console.log(clone.hello.world.text); // Hello World!
console.log(helloWorldObject.hello.world.text); // Hello
```
#### Create Object
```js
let create = clonePathWith({}, 'hello.world.text', () => {
    return 'Hello World!';
});
console.log(create.hello.world.text); // Hello World!
```
#### Push to arrays
```js
let someObject = {someArray:[1]};
let push = clonePathWith(someObject, 'someArray', (someArray) => {
    return [...someArray, 2]
});
console.log(push.someArray); // [1,2]
console.log(push === someObject); // false
console.log(push.someArray === someObject.someArray); // false
```
#### Replace arrays
```js
let someObject = {someArray:[1,2,3]};
let replace = clonePathWith(someObject, 'someArray[1]', (someArray1) => {
    return someArray1 + 3;
});
console.log(replace.someArray); // [1,5,3]
console.log(replace === someObject); // false
console.log(replace.someArray === someObject.someArray); // false
```