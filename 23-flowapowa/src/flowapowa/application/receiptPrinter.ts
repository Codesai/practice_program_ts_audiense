import { Bouquet } from './bouquet'

export interface ReceiptPrinter {
  print(bouquet: Bouquet): void

  output(): string
}
