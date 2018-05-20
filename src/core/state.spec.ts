import { State } from './state';
import { expect } from 'chai';
import 'mocha';

'use strict';

describe('State', () => {

    it('should return a frozen state', () => {
        const state = new State(100);
        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        let age: number = state.Current.age;

        age = 21;

        expect(state.Current.age).to.equal(12);

        expect(Object.isFrozen(state.Current)).to.be.true;
    });

    it('should not accept arrays', () => {
        const state = new State(100);
        state.Change([1, 2, 3]);
        expect(state.Current).to.equal(null);
    });

    it('should not accept Date objects', () => {
        const state = new State(100);
        state.Change(new Date());
        expect(state.Current).to.equal(null);
    });

    it('should contain age 12', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        const result = state.Current.age;
        expect(result).to.equal(12);
    });

    it('should contain age 12, then 13', () => {
        const state = new State(100);

        state.Change({
            age: 12,
            some: 'lol'
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13,
            some: 'lols'
        });

        console.log(state.Current);
        
        expect(state.Current.age).to.equal(13);
    });

    it('should contain age 12, then 13, then undo to 12', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(1);

        expect(state.Current.age).to.equal(12);
    });

    it('should contain age 12, then 13, then undo to 12 with 1 too many rollback steps', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(2);

        expect(state.Current.age).to.equal(12);
    });

    it('should contain age 12, then 13, then undo to 12 with 2 too many rollback steps', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(3);

        expect(state.Current.age).to.equal(12);
    });

    it('should contain age 12, then 13, then undo to 12, then redo to 13', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(1);

        expect(state.Current.age).to.equal(12);

        state.FastForward(1);

        expect(state.Current.age).to.equal(13);
    });

    it('should contain age 12, then 13, then undo to 12, then redo to 13 with 1 too many fastforward steps', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(1);

        expect(state.Current.age).to.equal(12);

        state.FastForward(2);

        expect(state.Current.age).to.equal(13);
    });

    it('should contain age 12, then 13, then undo to 12, then redo to 13 with 2 too many fastforward steps', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(1);

        expect(state.Current.age).to.equal(12);

        state.FastForward(3);

        expect(state.Current.age).to.equal(13);
    });

    it('should do nothing with blank changes', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        expect(state.Current.age).to.equal(12);

        state.Change({});

        expect(state.Current.age).to.equal(12);
    });

    it('should undo then change, then be unable to redo', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(1);

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 14
        });

        expect(state.Current.age).to.equal(14);

        state.FastForward(1);

        expect(state.Current.age).to.equal(14);

    });

    it('should undo, change, redo, change', () => {
        const state = new State(100);

        state.Change({
            age: 12
        });

        state.Change({
            age: 13
        });

        expect(state.Current.age).to.equal(13);

        state.Rollback(1);

        expect(state.Current.age).to.equal(12);

        state.Change({
            age: 14
        });

        expect(state.Current.age).to.equal(14);

        state.FastForward(1);

        expect(state.Current.age).to.equal(14);

        state.Change({
            age: 15
        });

        expect(state.Current.age).to.equal(15);

    });

});