export class Questionnaire {
    public durationInYears: number;
    public interest: number;
    public principal: number;

    constructor(durationInYears: number, interest: number, principal: number) {
        this.durationInYears = durationInYears;
        this.interest = interest;
        this.principal = principal;
    }
}
