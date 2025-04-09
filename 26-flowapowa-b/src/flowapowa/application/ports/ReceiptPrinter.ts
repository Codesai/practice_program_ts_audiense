import {Bouquet} from '../Bouquet'

export interface ReceiptPrinter {
    printReceipt(bouquet: Bouquet): string
}
