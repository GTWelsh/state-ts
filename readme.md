# README

## Intoduction

**state-ts** is an extremely simple state service that handles your state for you.

Written in Typescript.

## Installation

Using NPM

```console
$ npm i state-ts --save
```

Using Yarn

```console
$ yarn add state-ts
```

## Usage

```javascript
import { State } from 'state-ts';

const maxStackSize = 100;
const state = new State(maxStackSize);

state.Change({
    myNewProperty: 12
});

// test code
expect(state.Current.myNewProperty).to.equal(12);

state.Change({
    myNewProperty: 13
});

// test code
expect(state.Current.myNewProperty).to.equal(13);

state.Rollback(1);

// test code
expect(state.Current.myNewProperty).to.equal(12);

state.FastForward(1);

// test code
expect(state.Current.myNewProperty).to.equal(13);
```