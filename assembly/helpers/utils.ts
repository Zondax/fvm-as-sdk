import {ActorID} from "../env";
import {caller, usrForbidden} from "../wrappers";

/**
 * Returns true if the constructor is the called, false otherwise
 * @returns boolean
 */
export function isConstructorCaller(): boolean{
    const INIT_ACTOR_ADDR: ActorID = 1;

    if ( caller() != INIT_ACTOR_ADDR ) {
        usrForbidden()
        return false
    }

    return true
}
