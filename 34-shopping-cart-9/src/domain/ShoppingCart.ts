export interface ShoppingCart {
    display(): void;

    orderProductWith(productName: string): void;

    applyDiscount(discountCode: string): void;
}