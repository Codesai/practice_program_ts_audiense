import {Bouquet} from './bouquet'

export interface ReceiptPrinter {
    printReceipt(bouquet: Bouquet): string
}
