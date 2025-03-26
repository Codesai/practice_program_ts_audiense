import {Questionnaire} from "./Questionnaire";
import {MortgagePayment} from "../app/MortgagePaymentDto";

export interface MortgageCalculator {
    calculate(answer: Questionnaire): MortgagePayment[];
}
