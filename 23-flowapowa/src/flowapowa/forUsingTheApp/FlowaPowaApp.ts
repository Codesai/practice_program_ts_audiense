import { DeprecatedPriceProvider } from '../forGettingPrices/deprecatedPriceProvider.js'
import { BuildBouquet } from '../application/buildBouquet.js'
import { BouquetBuilder } from '../application/bouquetBuilder.js'
import { StringReceiptPrinter } from '../forPrintingRecipes/stringReceiptPrinter.js'
import { Flowapowa } from '../application/flowapowa.js'

function getDeprecatedPriceProvider(): DeprecatedPriceProvider {
  const priceProvider = new DeprecatedPriceProvider()
  priceProvider.add('rose', 1.5)
  priceProvider.add('daisy', 0.8)
  priceProvider.add('lily', 1.3)
  priceProvider.add('sunflower', 1.7)
  priceProvider.add('tulip', 1.1)
  priceProvider.add('foliage', 0.7)
  priceProvider.add('ribbon', 2)
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

export class FlowaPowaApp {
  static main(recipe: string): void {
    const flowaPowa: Flowapowa = new Flowapowa(
      getConfiguredBuildBouquet(),
      getStringReceiptPrinter(),
    )
    console.log('Creating bouquet with recipe: ' + recipe);
    console.log('--------------------------------------------------------------');
    console.log(flowaPowa.craftBouquet(recipe, 30))

  }
}
