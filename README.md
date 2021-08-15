
# CoSys Work

CoSys or Collaborative Systems are systems built to be composed together for various collaborative needs. Collaborative document editing and project management is under the CurEdit project, which serves as a kernel for a lot of CoSys compositions.

## ToC

Topics are mostly from the 'Type Driven Development with Idris' book by Edwin Barry. [ Link to Preview ](https://livebook.manning.com/book/type-driven-development-with-idris/chapter-1/)

#### Types and Type Driven Development
#### Simple and Dependent Types
#### Atomic and Composite Types
#### Pure and Monadic Types
#### Constrained and State Types
#### Parametrized and Quantitative Types
#### Existential and Universal Quantification
#### Bounded Vars and Implicit Context
#### ADTs, UDTs and UDFs
#### Actions and Sequences
#### Control Flow and Validations
#### Equality and Decidability
#### Equivalence and Univalence

# Dev Env Setup

Install the following:

1. Visual Studio Code or Webstorm
2. nvm and pnpm
3. Angular CLI (`pnpm i -g @angular/cli@latest`), NRWL NX ClI (`pnpm i -g nx@latest`)
4. Switch to the cloned/unzipped project folder. From within the project root, run `pnpm i`.

# NB
1. We use `pnpm` as the package manager. 
  - Please use `ng config -g cli.packageManager pnpm` (or without the global flag) to configure your project CLI.
  - Please use `pnx` instead of `nx` in the monorepo. In your shell config or shortcut config add `alias pnx="pnpm run nx --"`

# Dev Server Setup

1. Run the API server using one of these two:
   
   * `pnpm run nx -- serve api`
   
   * `pnx serve api` *if you have configured the above alias.*
   
2. Run the UI server using one of these two:
   
   * `pnpm run nx -- serve tr33ngl` 
   
   * `pnx serve tr33ngl` *if you have configured the above alias.*

3. Open both of the following in your browser:
   
   * `localhost:3333`
     
   * `localhost:4200`
  
