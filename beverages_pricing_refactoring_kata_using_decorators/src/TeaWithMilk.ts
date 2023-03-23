import {Tea} from "./Tea";

export class TeaWithMilk extends Tea {
    public price(): number {
        return super.price() +  0.10;
    }
}