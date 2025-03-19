# FlowaPowa

This is an exercise to practice **branch by abstraction** and other related techniques to manage big changes
with [Small Safe Steps](https://www.eferro.net/p/small-safe-steps-3s-workshop.html).

Adapted from [Fran Iglesias' exercise with the same name](https://github.com/franiglesias/flowapowa-ts-kata).

## Goal of the exercise

To learn practical techniques to work in Safe Small Steps when performing significant changes in a code base, with zero
downtime.

## The problem

FlowaPowa is an application to create flower bouquets. It depends on a library to get the latest prices for flowers and
other elements, like Foliage and Ribbons, from the _Worldwide Flower Market_. Sadly, this library was deprecated, and it
will be declared _end of life_ real soon.

So, we will need to migrate to a new library that will give us access to the same prices, but with a new interface.

The problem is that we need to execute the migration during the most important season of the year. We want to achieve
zero downtime to avoid losing sales.

The architecture of the application is pretty decent, but it has some flaws. The deprecated library was used with little
care and code is tightly coupled to it. You could find other code smells as well, because original programmer was not so
proficient.

### The challenge

We want zero downtime, so we should migrate the application to use the new library without breaking the app. Fortunately
we have a fairly comprehensive test suite, and any change that could break it should be noticed by the tests.

Also, we want to use Trunk Based Development and small batches. We need to follow a strategy to isolate the changes
needed and be able to make the transition without breaking the pipeline.

YOU CANNOT COMMIT IF TESTS ARE NOT PASSING.

### Summary

* We want to move from `DeprecatedPriceProvider` to `NewVendorProductProvider`.
* We cannot commit any change if tests are RED. We should revert the changes.
* We should commit as soon as possible.

### Recommendations

* Identify and isolate the parts of the code that need change.
* Prepare the code base to accept the needed changes in advance.
* Smaller steps are way better if you need to revert your changes.

### Some caveats and design decisions

* We don't use currency for the sake of simplicity.
* Interface of FlowaPowa::main() accepts recipe strings like "rose:12;daisy:15;foliage:1;".
* Flower names in singular are used as id of the products.
* Sort of Hexagonal Architecture, ports are named from the kind of conversation they establish with the outer world.
* The new Vendor lives in the `lib` folder to simulate a third party library.

## Reference documents

* [Fowler, M: Branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)
* [Branch by abstraction website](https://www.branchbyabstraction.com/)
