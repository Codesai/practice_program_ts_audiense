import {ReceiptPrinter} from '../application/ports/ReceiptPrinter'
import {Bouquet} from '../application/Bouquet'

export class StringReceiptPrinter implements ReceiptPrinter {
    printReceipt(bouquet: Bouquet): string {
        return bouquet.receipt().print();
    }
}
