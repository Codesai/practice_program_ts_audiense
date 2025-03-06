import { ReceiptPrinter } from '../application/receiptPrinter'
import { Bouquet } from '../application/bouquet'

export class StringReceiptPrinter implements ReceiptPrinter {
  private toOutput: string

  output(): string {
    return this.toOutput
  }

  print(bouquet: Bouquet): void {
    this.toOutput = bouquet.receipt().print()
  }
}
