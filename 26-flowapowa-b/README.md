# FlowaPowa continuation (II)

This is an exercise to practice **branch by abstraction** and other related techniques to manage big changes
with [Small Safe Steps](https://www.eferro.net/p/small-safe-steps-3s-workshop.html).

Adapted from [Fran Iglesias' exercise with the same name](https://github.com/franiglesias/flowapowa-ts-kata).

We've introduced an abstraction that provides the required service, so that, now the application doesn't see
the deprecated service provider that we need to substitute.

## Goals

1. Change `PriceProvider` interface to have the method `getPrice(elementId: ElementId): Price;`
   instead of `getPrice(elementId: ElementId): number;`. Do this change without breaking the tests in any moment.

2. Introduce an experiment to test in production that both implementations of `PricesManager` do the same.
   The experiment should be transparent to the clients of the `PricesManager` interface (you can't change any code in
   `appplication` to run this experiment).

3. Remove the old implementation of `PricesManager` from the code base.

## Reference documents

* [Fowler, M: Branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)
* [Branch by abstraction website](https://www.branchbyabstraction.com/)
* [Example of role tests in JavaScript with Jest](https://codesai.com/posts/2022/08/role-tests-jest)
