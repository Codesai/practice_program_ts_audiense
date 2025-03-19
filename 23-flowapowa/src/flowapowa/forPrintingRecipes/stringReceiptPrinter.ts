import {ReceiptPrinter} from '../application/receiptPrinter'
import {Bouquet} from '../application/bouquet'

export class StringReceiptPrinter implements ReceiptPrinter {
    printReceipt(bouquet: Bouquet): string {
        return bouquet.receipt().print();
    }
}
