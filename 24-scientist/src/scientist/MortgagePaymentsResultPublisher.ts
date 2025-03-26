import * as scientist from 'tzientist';
import {Questionnaire} from "../model/Questionnaire";
import {MortgagePayment} from "../app/MortgagePaymentDto";
import * as fs from 'fs';

export function publish(results: scientist.Results<[Questionnaire], MortgagePayment[]>): void {
    let report = `Results for experiment '${results.experimentName}' on ${new Date().toISOString()}\n`;
    report += `Result: ${(JSON.stringify(results.controlResult) == JSON.stringify(results.candidateResult) ? "MATCH" : "MISMATCH")}\n`;
    if(results.controlResult){
        report +=`Control duration: ${results.controlTimeMs}\n`;
        results.controlResult.forEach((value) => {
            report += `Control value: ${JSON.stringify(value)}\n`;
        });
    }
    if(results.candidateResult){
        report +=`Candidate duration: ${results.candidateTimeMs}\n`;
        results.candidateResult.forEach((value) => {
            report += `Candidate value: ${JSON.stringify(value)}\n`;
        });
    }

    report += "== End experiment ==\n\n";

    fs.writeFile(__dirname + '/experiment-results.txt', report, function (err) {
        if (err) throw err;
    });
}