export class MortgagePaymentDto {
    public month: number;
    public startingBalance: number;
    public interest: number;
    public monthlyPayment: number;
    public principal: number;
    public endingBalance: number;

    constructor(
        month: number,
        startingBalance: number,
        interest: number,
        monthlyPayment: number,
        principal: number,
        endingBalance: number
    ) {
        this.month = month;
        this.startingBalance = startingBalance;
        this.interest = interest;
        this.monthlyPayment = monthlyPayment;
        this.principal = principal;
        this.endingBalance = endingBalance;
    }
}
