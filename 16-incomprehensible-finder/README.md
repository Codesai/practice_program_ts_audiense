# Introduction

Here is the bad news: the new developer you hired has written some terrible, atrocious code.
No one can understand what it does.

The good news: at least there are unit tests to prove the code is working.

You job is to refactor the code and make it readable, while keeping the code in working order (passing all tests).

# Tips

* Start with simple rename refactors so you can better understand the abstractions you are working with. Rename any
  class or any variable.
* Move on to extract methods and making the code more modular.
* See if you can also eliminate switch statements and multiple exit points from methods. Don't touch any conditional
  logic unless it's well protected (see coverage & mutants)

Anything is fair game, create new classes, new methods, and rename tests.
The only restriction is that the existing tests have to keep working (are the tests good enough?).
Lean on the tests and run them after every small change to make sure you are on the right path.

# How to End

You can stop when you feel the code is good enough, something you can come back to in 6 months and understand.

# Credits

This kata is a TypeScript port of the original Incomprehensible Finder Refactoring Kata created
by [K. Scott Allen](https://github.com/OdeToCode).

