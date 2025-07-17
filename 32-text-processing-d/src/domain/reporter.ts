import {AnalysisResult} from "./analysisResult";

export interface Reporter {
    report(analysisResult: AnalysisResult): void;
}