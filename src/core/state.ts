class State {
    private stackIndex: number = null;
    private stack: Array<Readonly<any>> = [];
    private flags = {
        removeFutureStack: false
    };

    constructor(private maxStackSize: number, private freeze: boolean = true) { }

    public get Current(): Readonly<any> {
        if (this.stackIndex !== null && (this.stack.length - 1) >= this.stackIndex) {
            return this.stack[this.stackIndex];
        }

        return null;
    }

    public Change(alterations: object): void {
        if (this.AlterationsAreValid(alterations) === false) {
            return;
        }

        this.HandleUndoState();
        this.AddObjectToStack(
            this.GenerateNewStackObject(alterations)
        );
        this.IncrementStackIndex();
        this.HandleOversizeState();
    }

    public Rollback(steps: number): void {
        if (steps === 0) {
            return;
        }
        if (steps >= this.stackIndex) {
            this.stackIndex = 0;
        } else {
            this.stackIndex -= steps;
        }

        this.flags.removeFutureStack = true;
    }

    public FastForward(steps: number): void {
        if (steps === 0) {
            return;
        }

        const lengthStepsDifference: number = this.StackLength - steps;

        if (lengthStepsDifference < this.stackIndex && lengthStepsDifference >= 0) {
            this.stackIndex += steps;
        } else {
            this.stackIndex = this.StackLength - 1;
        }
    }

    private get StackLength(): number {
        return this.stack.length;
    }

    private IncrementStackIndex(): void {
        if (this.stackIndex === null) {
            this.stackIndex = 0;
        } else {
            this.stackIndex++;
        }
    }

    private HandleOversizeState(): void {
        const maxStackSize: number = this.maxStackSize;
        if (maxStackSize && this.StackLength > maxStackSize) {
            this.stack.shift();
        }
    }

    private HandleUndoState(): void {
        if (this.flags.removeFutureStack) {
            this.stack.splice(this.stackIndex + 1);
            this.flags.removeFutureStack = false;
        }
    }

    private AddObjectToStack(obj: Readonly<object>): void {
        this.stack.push(obj);
    }

    private AlterationsAreValid(alterations: object): boolean {
        return alterations.constructor === Object;
    }

    private IsBlankObject(obj: object) {
        return Object.keys(obj).length === 0 && obj.constructor === Object;
    }

    private GenerateNewStackObject(alterations: object): Readonly<object> {
        if (this.IsBlankObject(alterations)) {
            return this.Current;
        }
        const newState = {
            ...this.Current,
            ...alterations
        };

        const result = this.freeze ? Object.freeze(newState) : newState;

        return result;
    }
}

export {
    State
};
