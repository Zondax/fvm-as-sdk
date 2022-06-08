import {ActorID} from "../env";
import {caller, usrForbidden} from "../wrappers";

export function isConstructorCaller(): boolean{
    const INIT_ACTOR_ADDR: ActorID = 1;

    if ( caller() != INIT_ACTOR_ADDR ) {
        usrForbidden()
        return false
    }

    return true
}
