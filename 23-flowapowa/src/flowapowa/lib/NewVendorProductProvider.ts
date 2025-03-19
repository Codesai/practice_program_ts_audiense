import {VendorProduct} from './VendorProduct.js'

/*
 * NewVendorProductProvider represents a new third party library that we want to use to replace our current, outdated dependency.
 * */
export class NewVendorProductProvider {
    private products: Map<string, VendorProduct> = new Map()

    store(product: VendorProduct): void {
        this.products.set(product.name, product)
    }

    getProductByName(productName: string): VendorProduct | undefined {
        return this.products.get(productName)
    }
}
