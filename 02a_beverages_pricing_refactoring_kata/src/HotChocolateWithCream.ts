import {HotChocolate} from "./HotChocolate";

export class HotChocolateWithCream extends HotChocolate {
    public price(): number {
        return 1.45 + 0.15;
    }
}