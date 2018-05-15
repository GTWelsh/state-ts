"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const state_1 = require("./state");
const chai_1 = require("chai");
require("mocha");
'use strict';
describe('State', () => {
    it('should return a frozen state', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        let age = state.Current.age;
        age = 21;
        chai_1.expect(state.Current.age).to.equal(12);
        chai_1.expect(Object.isFrozen(state.Current)).to.be.true;
    });
    it('should not accept arrays', () => {
        const state = new state_1.State(100);
        state.Change([1, 2, 3]);
        chai_1.expect(state.Current).to.equal(null);
    });
    it('should not accept Date objects', () => {
        const state = new state_1.State(100);
        state.Change(new Date());
        chai_1.expect(state.Current).to.equal(null);
    });
    it('should contain age 12', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        const result = state.Current.age;
        chai_1.expect(result).to.equal(12);
    });
    it('should contain age 12, then 13', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
    });
    it('should contain age 12, then 13, then undo to 12', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(1);
        chai_1.expect(state.Current.age).to.equal(12);
    });
    it('should contain age 12, then 13, then undo to 12 with 1 too many rollback steps', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(2);
        chai_1.expect(state.Current.age).to.equal(12);
    });
    it('should contain age 12, then 13, then undo to 12 with 2 too many rollback steps', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(3);
        chai_1.expect(state.Current.age).to.equal(12);
    });
    it('should contain age 12, then 13, then undo to 12, then redo to 13', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(1);
        chai_1.expect(state.Current.age).to.equal(12);
        state.FastForward(1);
        chai_1.expect(state.Current.age).to.equal(13);
    });
    it('should contain age 12, then 13, then undo to 12, then redo to 13 with 1 too many fastforward steps', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(1);
        chai_1.expect(state.Current.age).to.equal(12);
        state.FastForward(2);
        chai_1.expect(state.Current.age).to.equal(13);
    });
    it('should contain age 12, then 13, then undo to 12, then redo to 13 with 2 too many fastforward steps', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(1);
        chai_1.expect(state.Current.age).to.equal(12);
        state.FastForward(3);
        chai_1.expect(state.Current.age).to.equal(13);
    });
    it('should do nothing with blank changes', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({});
        chai_1.expect(state.Current.age).to.equal(12);
    });
    it('should undo then change, then be unable to redo', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(1);
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 14
        });
        chai_1.expect(state.Current.age).to.equal(14);
        state.FastForward(1);
        chai_1.expect(state.Current.age).to.equal(14);
    });
    it('should undo, change, redo, change', () => {
        const state = new state_1.State(100);
        state.Change({
            age: 12
        });
        state.Change({
            age: 13
        });
        chai_1.expect(state.Current.age).to.equal(13);
        state.Rollback(1);
        chai_1.expect(state.Current.age).to.equal(12);
        state.Change({
            age: 14
        });
        chai_1.expect(state.Current.age).to.equal(14);
        state.FastForward(1);
        chai_1.expect(state.Current.age).to.equal(14);
        state.Change({
            age: 15
        });
        chai_1.expect(state.Current.age).to.equal(15);
    });
});
//# sourceMappingURL=state.spec.js.map