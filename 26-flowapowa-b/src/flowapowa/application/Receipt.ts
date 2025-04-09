import {Product} from './Product'

interface ReceiptLine {
    print(): string
}

class TotalLine implements ReceiptLine {
    private text: string
    private amount: number

    constructor(text: string, amount: number) {
        this.text = text
        this.amount = amount
    }

    print(): string {
        let line: string = this.text.padEnd(20, ' ') + ' '
        line += this.amount.toFixed(2).padStart(8, ' ')
        return line
    }
}

class Separator implements ReceiptLine {
    print(): string {
        return ''.padEnd(29, '-')
    }
}

class Line implements ReceiptLine {
    private element: string
    private quantity: number
    private price: number
    private amount: number

    constructor(
        element: string,
        quantity: number,
        price: number,
        amount: number,
    ) {
        this.element = element
        this.quantity = quantity
        this.price = price
        this.amount = amount
    }

    print(): string {
        let line = toTitleCase(this.element).padEnd(8, ' ') + ' '
        line += this.quantity.toString().padStart(5, ' ') + ' '
        line += this.price.toFixed(2).padStart(6, ' ') + ' '
        line += this.amount.toFixed(2).padStart(7, ' ')

        return line

        function toTitleCase(title: string): string {
            return title
                .toLowerCase()
                .split(' ')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ');
        }
    }
}

export class Receipt {
    private lines: ReceiptLine[]

    constructor() {
        this.lines = []
    }

    addTotal(total: string, amount: number): void {
        const line = new TotalLine(total, amount)
        this.lines.push(line)
    }

    addProduct(product: Product): void {
        this.addPart(product.name, product.quantity, product.price, product.amount())
    }

    addSeparator(): void {
        this.lines.push(new Separator())
    }

    print(): string {
        let receipt = ''
        this.lines.forEach((line) => {
            receipt += line.print() + '\n'
        })

        return receipt.trim()
    }

    private addPart(
        element: string,
        quantity: number,
        price: number,
        amount: number,
    ): void {
        const line = new Line(element, quantity, price, amount)
        this.lines.push(line)
    }
}
