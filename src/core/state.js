"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class State {
    constructor(maxStackSize) {
        this.maxStackSize = maxStackSize;
        this.stackIndex = null;
        this.stack = [];
        this.flags = {
            removeFutureStack: false
        };
    }
    get Current() {
        if (this.stackIndex !== null && (this.stack.length - 1) >= this.stackIndex) {
            return this.stack[this.stackIndex];
        }
        return null;
    }
    Change(alterations) {
        if (this.AlterationsAreValid(alterations) === false) {
            return;
        }
        this.HandleUndoState();
        this.AddObjectToStack(this.GenerateNewStackObject(alterations));
        this.IncrementStackIndex();
        this.HandleOversizeState();
    }
    Rollback(steps) {
        if (steps === 0) {
            return;
        }
        if (steps >= this.stackIndex) {
            this.stackIndex = 0;
        }
        else {
            this.stackIndex -= steps;
        }
        this.flags.removeFutureStack = true;
    }
    FastForward(steps) {
        if (steps === 0) {
            return;
        }
        const lengthStepsDifference = this.StackLength - steps;
        if (lengthStepsDifference < this.stackIndex && lengthStepsDifference >= 0) {
            this.stackIndex += steps;
        }
        else {
            this.stackIndex = this.StackLength - 1;
        }
    }
    get StackLength() {
        return this.stack.length;
    }
    IncrementStackIndex() {
        if (this.stackIndex === null) {
            this.stackIndex = 0;
        }
        else {
            this.stackIndex++;
        }
    }
    HandleOversizeState() {
        const maxStackSize = this.maxStackSize;
        if (maxStackSize && this.StackLength > maxStackSize) {
            this.stack.shift();
        }
    }
    HandleUndoState() {
        if (this.flags.removeFutureStack) {
            this.stack.splice(this.stackIndex + 1);
            this.flags.removeFutureStack = false;
        }
    }
    AddObjectToStack(obj) {
        this.stack.push(obj);
    }
    AlterationsAreValid(alterations) {
        return alterations.constructor === Object;
    }
    IsBlankObject(obj) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }
    GenerateNewStackObject(alterations) {
        if (this.IsBlankObject(alterations)) {
            return this.Current;
        }
        return Object.freeze(Object.assign({}, this.Current, alterations));
    }
}
exports.State = State;
//# sourceMappingURL=state.js.map