import { Drink } from "../../src/drink";
import { Order } from "../../src/order";

export function aCoffee(): OrderBuilder {
    return new OrderBuilder(Drink.Coffee);
};

export function aTea(): OrderBuilder {
    return new OrderBuilder(Drink.Tea);
};

export function aHotChocolate(): OrderBuilder {
    return new OrderBuilder(Drink.Chocolate);
};

export function anOrangeJuice(): OrderBuilder {
    return new OrderBuilder(Drink.OrangeJuice);
};

class OrderBuilder {
    private readonly _selectedDrink: Drink;
    private _spoonsOfSugars: number;
    private _extraHot: boolean;

    constructor(selectedDrink: Drink) {
        this._selectedDrink = selectedDrink;
        this._extraHot = false;
        this._spoonsOfSugars = 0;
    }

    make(): Order {
        return new Order(this._selectedDrink, this._extraHot, this._spoonsOfSugars);
    }
    withSpoonsOfSugar(spoonsOfSugar: number): OrderBuilder {
        this._spoonsOfSugars = spoonsOfSugar;
        return this;
    }

    extraHot(): OrderBuilder {
        this._extraHot = true;
        return this;
    }
}