# FlowaPowa continuation (I)

This is an exercise to practice **branch by abstraction** and other related techniques to manage big changes
with [Small Safe Steps](https://www.eferro.net/p/small-safe-steps-3s-workshop.html).

Adapted from [Fran Iglesias' exercise with the same name](https://github.com/franiglesias/flowapowa-ts-kata).

We've introduced an abstraction that provides the required service, so that, now the application doesn't see 
the deprecated service provider that we need to substitute.

## Goals

1. Test drive a new implementation of the abstraction that uses the new vendor library.

2. Reduce duplication in tests by creating a "role test", see [Example of role tests in JavaScript with Jest](https://codesai.com/posts/2022/08/role-tests-jest).

3. Introduce an experiment to test in production that both implementations do the same.

4. Remove the old implementation from your code base.

## Reference documents

* [Fowler, M: Branch by abstraction](https://martinfowler.com/bliki/BranchByAbstraction.html)
* [Branch by abstraction website](https://www.branchbyabstraction.com/)
