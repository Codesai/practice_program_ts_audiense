import {Service} from "./Service";
import {MortgagePaymentDto} from "../model/MortgagePayment";

abstract class App {
    public static main(): void {
        const service = new Service();
        const examples = this.generateSomeExamples();
        for (const example of examples) {
            const result = service.execute(example[0], example[1], example[2]);
            this.printResult(result);
        }
    }

    private static printResult(result: MortgagePaymentDto[]): void {
        console.log("== Your Mortgage Calculations ==");
        result.forEach(x => {
            console.log("\n");
            console.log("Month:", x.month);
            console.log("Principal Monthly:", x.principal);
            console.log("Starting Balance:", x.startingBalance);
            console.log("Ending Balance:", x.endingBalance);
            console.log("Monthly Payment:", x.monthlyPayment);
            console.log("Monthly Interest:", x.interest);
        });
    }

    private static generateSomeExamples(): [number, number, number][] {
        return [
            [1, 4, 3000],
            [2, 4.5, 1000],
        ];
    }

}

App.main();
