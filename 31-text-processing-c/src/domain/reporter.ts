import {Analysis} from "./analysis";

export interface Reporter {
    report(analysis: Analysis): void;
}