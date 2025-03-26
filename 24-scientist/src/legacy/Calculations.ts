import {Questionnaire} from "../model/Questionnaire";
import {MortgagePayment} from "../app/MortgagePaymentDto";

export class Calculations {
    public static mortgageCalculations(answer: Questionnaire): MortgagePayment[] {
        const output: MortgagePayment[] = [];

        const durationInMonths = this.calculateTotalMonths(answer.durationInYears);
        const monthlyPayment = this.monthlyPayment(answer.principal, answer.interest, durationInMonths, false);
        let displayMonthlyPayment = this.monthlyPayment(answer.principal, answer.interest, durationInMonths, true);

        let calculateMonth = 0;
        for (let i = durationInMonths; i > 0; i--) {
            calculateMonth++;

            const monthlyInterest = this.monthlyInterest(answer.principal, answer.interest);
            const monthlyPrincipalPayment = monthlyPayment - monthlyInterest;
            const startingBalance = answer.principal;
            answer.principal += monthlyInterest;
            answer.principal -= monthlyPayment;
            const displayStartingBalance = parseFloat(startingBalance.toFixed(2));
            displayMonthlyPayment = parseFloat(monthlyPayment.toFixed(2));
            const endingBalance = parseFloat(answer.principal.toFixed(2));
            const displayInterest = parseFloat(monthlyInterest.toFixed(2));
            const displayMonthlyPrincipal = parseFloat(monthlyPrincipalPayment.toFixed(2));

            output.push(new MortgagePayment(
                calculateMonth,
                displayStartingBalance,
                displayInterest,
                displayMonthlyPayment,
                displayMonthlyPrincipal,
                endingBalance
            ));
        }

        return output;
    }

    private static monthlyPayment(principal: number, interest: number, duration: number, isDisplayValue: boolean): number {
        let output = 0;

        const monthlyInterestRate = this.monthlyInterestRate(interest);
        const mortgageMagic = 1 - Math.pow(1 + monthlyInterestRate, -duration);

        output = principal * (monthlyInterestRate / mortgageMagic);
        if (isDisplayValue) {
            output = parseFloat(output.toFixed(2));
        }

        return output;
    }

    private static monthlyInterest(principal: number, interest: number): number {
        let output = 0;
        output = principal * this.monthlyInterestRate(interest);
        return output;
    }

    private static monthlyInterestRate(interest: number): number {
        return interest / 100 / 12;
    }

    private static calculateTotalMonths(years: number): number {
        return years * 12;
    }
}
