declare class State {
    private maxStackSize;
    private stackIndex;
    private stack;
    private flags;
    constructor(maxStackSize: number);
    readonly Current: Readonly<any>;
    Change(alterations: object): void;
    Rollback(steps: number): void;
    FastForward(steps: number): void;
    private readonly StackLength;
    private IncrementStackIndex();
    private HandleOversizeState();
    private HandleUndoState();
    private AddObjectToStack(obj);
    private AlterationsAreValid(alterations);
    private IsBlankObject(obj);
    private GenerateNewStackObject(alterations);
}
export { State };
