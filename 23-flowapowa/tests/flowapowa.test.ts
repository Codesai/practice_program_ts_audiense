import { BuildBouquet } from '../src/flowapowa/application/buildBouquet'
import { StringReceiptPrinter } from '../src/flowapowa/forPrintingRecipes/stringReceiptPrinter'
import { Flowapowa } from '../src/flowapowa/application/flowapowa'
import { BouquetBuilder } from '../src/flowapowa/application/bouquetBuilder'
import { DeprecatedPriceProvider } from '../src/flowapowa/forGettingPrices/deprecatedPriceProvider'

function getDeprecatedPriceProvider(): DeprecatedPriceProvider {
  const priceProvider = new DeprecatedPriceProvider()
  priceProvider.add('rose', 1.5)
  priceProvider.add('daisy', 0.8)
  return priceProvider
}

function getConfiguredBuildBouquet(): BuildBouquet {
  const priceProvider = getDeprecatedPriceProvider()
  const builder = new BouquetBuilder(priceProvider)
  return new BuildBouquet(builder)
}

function getStringReceiptPrinter(): StringReceiptPrinter {
  return new StringReceiptPrinter()
}

describe('FlowaPowa', () => {
  it('should make a simple bouquet', () => {
    const flowaPowa: Flowapowa = new Flowapowa(
      getConfiguredBuildBouquet(),
      getStringReceiptPrinter(),
    )

    const recipe: string = 'rose:12'
    const result = flowaPowa.craftBouquet(recipe, 35)
    const expected = `Rose        12   1.50   18.00
Crafting                 6.30
-----------------------------
Total                   24.30`.trim()
    expect(result).toBe(expected)
  })

  it('should make a complex bouquet', () => {
    const flowaPowa: Flowapowa = new Flowapowa(
      getConfiguredBuildBouquet(),
      getStringReceiptPrinter(),
    )

    const recipe: string = 'rose:12;daisy:16'
    const result = flowaPowa.craftBouquet(recipe, 35)
    const expected = `Rose        12   1.50   18.00
Daisy       16   0.80   12.80
Crafting                10.78
-----------------------------
Total                   41.58`.trim()
    expect(result).toBe(expected)
  })
})
