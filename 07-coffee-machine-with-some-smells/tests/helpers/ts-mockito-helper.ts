import {capture} from "ts-mockito";

export function captureLast(fn: any): any {
    return capture(fn).last()[0];
}