import {Questionnaire} from "../model/Questionnaire";
import {MortgageCalculator} from "../model/MortgageCalculator";
import {MortgagePayment} from "../app/MortgagePaymentDto";
import {Calculations} from "./Calculations";
import { execSync } from "child_process";

export class LegacyMortgageCalculator implements MortgageCalculator {
  public calculate(answer: Questionnaire): MortgagePayment[] {
    execSync("sleep 0.5");
    return Calculations.mortgageCalculations(answer);
  }
}