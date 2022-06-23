// @ts-ignore
@base_state
export class NewBaseState {
    save():void{}

    protected load():NewBaseState{
        return new NewBaseState()
    }
}
