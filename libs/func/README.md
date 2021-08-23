# func

This library aims to showcase an implementation of monads and basic monadic types using nominative and tagging based approach for identifying types at both runtime and compile time. 

# Reading the Code

Here are the three frequently needed pure functional programming types:

1. Functor
2. Applicative
3. Monad

From the `functor.ts` file you can see how a `functor` is anything implementing the interface which defines a `map` operation on values into values inside the `Functor` context. 

Note that we had a value of some type `T` and with a functor we now have the value of type `Functor<T>` i.e: it is now inside the `Functor` context.

From the `applicative.ts` file you can see how an `applicative` is anything that implements an extended functor interface that can be 'applied' to value(s) that are already inside the `Functor` context.

From the `monad.ts` file you can see how a `monad` is anything that implements an extended applicative interface that we can use to 'bind' from within functor A to a value in functor B.

`lib` contains the basic definitions of the following monads:

- `Either`
- `Graph`
- `List`
- `Maybe`
- `Result`

These are some powerful ideas that we will use in the rest of the course/documentation.

`type-bazaar` contains basic definitions of the following algebraic structures:

- `Groupoid`
- `Magma`
- `Monoid`
- `Semigroup`
- `Unital Magma`

# Roadmap
These 'simple' monads do not easily cover cases for future value or an undetermined value. However, a future addition generated using Idris will cover some of these advanced use cases. 

# More
Further documentation and learning materials and reference implementations for simple and dependent types will be published under the `@cosys` namespace and explained at `umbrela.academy`.
