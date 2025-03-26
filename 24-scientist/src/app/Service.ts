import {MortgagePaymentDto} from "../model/MortgagePayment";
import {LegacyMortgageCalculator} from "../legacy/LegacyMortgageCalculations";
import {MortgagePayment} from "./MortgagePaymentDto";
import {Questionnaire} from "../model/Questionnaire";

export class Service {

    public execute(durationInYears: number, interest: number, principal: number): MortgagePaymentDto[] {
        const answer = this.createQuestionnaire(durationInYears, interest, principal);
        const mortgagePayment = new LegacyMortgageCalculator().calculate(answer);
        return mortgagePayment.map(this.createMortgageDto);
    }

    private createMortgageDto(x: MortgagePayment): MortgagePaymentDto {
        return new MortgagePaymentDto(
            x.month,
            x.startingBalance,
            x.interest,
            x.monthlyPayment,
            x.principal,
            x.endingBalance
        );
    }

    private createQuestionnaire(durationInYears: number, interest: number, principal: number): Questionnaire {
        return new Questionnaire(durationInYears, interest, principal);
    }
}
