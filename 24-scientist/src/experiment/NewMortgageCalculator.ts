import {Questionnaire} from "../model/Questionnaire";
import {MortgageCalculator} from "../model/MortgageCalculator";
import {MortgagePayment} from "../app/MortgagePaymentDto";

export class NewMortgageCalculator implements MortgageCalculator {
    public calculate(answer: Questionnaire): MortgagePayment[] {
        const result: MortgagePayment[] = [];

        const durationInMonths = this.calculateTotalMonths(answer.durationInYears);
        let principalMonthly = answer.principal;

        for (let i = 0; i < durationInMonths; i++) {
            const monthlyInterest = this.monthlyInterest(principalMonthly, answer);
            const monthlyPrincipalPayment = this.monthlyPrincipalPayment(principalMonthly, answer);
            const startingBalance = principalMonthly;
            principalMonthly += this.principalMonthly(principalMonthly, answer);

            result.push(new MortgagePayment(
                i + 1,
                this.round(startingBalance),
                this.round(monthlyInterest),
                this.round(this.monthlyPayment(answer)),
                this.round(monthlyPrincipalPayment),
                this.round(principalMonthly)
            ));
        }

        return result;
    }

    private principalMonthly(principalMonthly: number, answer: Questionnaire): number {
        const monthlyInterest = this.monthlyInterest(principalMonthly, answer);
        const monthlyPayment = this.monthlyPayment(answer);
        return monthlyInterest - monthlyPayment;
    }

    private monthlyPrincipalPayment(principalMonthly: number, answer: Questionnaire): number {
        const monthlyInterest = this.monthlyInterest(principalMonthly, answer);
        const monthlyPayment = this.monthlyPayment(answer);
        return monthlyPayment - monthlyInterest;
    }

    private monthlyPayment(answer: Questionnaire): number {
        const duration = this.calculateTotalMonths(answer.durationInYears);
        const monthlyInterestRate = this.monthlyInterestRate(answer.interest);
        const mortgageMagic = 1 - Math.pow(1 + monthlyInterestRate, -duration);

        return (answer.principal * (monthlyInterestRate / mortgageMagic));
    }

    private round(value: number): number {
        return parseFloat(value.toFixed(2));
    }

    private monthlyInterest(principalMonthly: number, answer: Questionnaire): number {
        return principalMonthly * this.monthlyInterestRate(answer.interest);
    }

    private monthlyInterestRate(interest: number): number {
        return interest / 100 / 12;
    }

    private calculateTotalMonths(years: number): number {
        return years * 12;
    }
}
