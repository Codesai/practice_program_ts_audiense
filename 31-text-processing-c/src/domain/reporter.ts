import {AnalysisResult} from "./analysisResult";

export interface Reporter {
    report(analysis: AnalysisResult): void;
}