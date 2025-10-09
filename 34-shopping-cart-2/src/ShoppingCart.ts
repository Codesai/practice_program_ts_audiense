import {ContentDisplay} from "./ContentDisplay";
import {CartContent} from "./CartContent";
import {AvailableProductsRepository} from "./AvailableProductsRepository";
import {Product} from "./Product";
import {Order} from "./Order";

export class ShoppingCart {
    private products: Product[];
    private contentDisplay: ContentDisplay;
    private availableProductsRepository: AvailableProductsRepository;

    constructor(contentDisplay: ContentDisplay, availableProductsRepository: AvailableProductsRepository) {
        this.contentDisplay = contentDisplay;
        this.availableProductsRepository = availableProductsRepository;
        this.products = [];
    }

    display(): void {
        const orders = this.products.map(product => new Order(product.name, product.cost, 1));
        this.contentDisplay.show(new CartContent(orders, orders.length, this.products[0]?.cost || 0))
    }

    addItem(productName: string): void {
        const product = this.availableProductsRepository.findProductWith(productName);
        this.products.push(product);
    }
}
