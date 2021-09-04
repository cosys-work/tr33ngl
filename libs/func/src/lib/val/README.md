# 0. Value and ValU

Functional Programming is about functions but functions themselves are about values. 

In a programming language, one usually has a construct that allows storing of a known value or a value to be computed.

In typescript, you can typically achieve it like this:

```typescript
const clue = 42;
```

This creates a "constant" value holder that we can carry around with us and reuse. We say that the value `42` has been 
assigned to the `const clue`. If you have this and someone asks you for a ***c***lue about the answer to "***l***ife,
***u***niverse, and ***e***verything" you can just give them your `clue` constant. This is exactly what this function named `theAnswer` shown below does:


```typescript
const clue = 42;

function theAnswer() {
    return clue;
}

console.log(`
The answer to 
life, 
universe 
and 
everything 
is:`, 
  theAnswer());
```

So we have seen that `clue` is a **_value_** containing a number. Further, `question` is a **_function_** that 
returns a value, which is also a number - more precisely, `question` returns `clue` itself. The above code has 
omitted something called a **_type declaration_**. With type declarations, which are "obvious" or automatically 
inferrable in the above code, the above code would look like this: 

```typescript
const clue: number = 42;

function question(): number {
    return clue;
}
```

This makes it clearer that `clue` is a **const** that holds a `number`. And that the **function** named `question` 
returns something that is a `number`. We can further specify using the types that the types are not `number` in each 
case but rather just something of type which allows only for `42` as a possible number.   

```typescript
const clue: 42 = 42;

function question(): 42 {
    return clue;
}
```

This might look a bit repetitive at first sight. However, what is happening here is that we have used `42` as a 
**_literal type_** on the left-hand side of the assignment operation(`=`) and as a **_value_** on the right-hand side of `=`. 
This means that the only possible value of the `const clue` can be the number `42`. This also applies for the only 
possible return value of `function question()` declared after `const clue`.

There are three kinds of literal types in Typescript:
1. `boolean`: A primitive type whose value can be either `true` or `false`.
2. `number`: A primitive type whose value can be any given number (of limited precision).
3. `string`: A primitive type whose value can be any given characters - including numeric characters - quoted inside 
   with either "double-quotes" or 'single-quotes' or \`backticks\`.  

As with any other "type", a "literal type" tells us which values are possible within that type. A "literal type" is 
literally quite literal. It just tells us precisely what is and isn't allowed by giving us valid examples of it 
within the type declaration. Here's another example of a literal type definition that allows more than one exact value.

```typescript

function randomOnetoSix(): 1 | 2 | 3 | 4 | 5 | 6 {
    const between0and1 = Math.random();
    const between0and10 = between0and1 * 10;
    const from0to9 = Math.floor(between0and10);
    return from1to6 = from0to9 % 6 + 1;
}

function sixSidedDiceRoll(): 1 | 2 | 3 | 4 | 5 | 6 {
  const roll: 1 | 2 | 3 | 4 | 5 | 6 = randomOnetoSix();
  console.log("Rolled number is: ", roll);
  return roll;
}
```

Here you can see that the `function randomFrom1To6()` returns a random value between 1 and 6 using the standard Math library. It multiplies a random number between 0 and 1 by 10 and then takes the first digit of the result. It then takes the modulus of the 1-digit number with 6. This is thus not a fair dice roller at all. 

Since this function is used again as the return value of another function named `sixSidedDiceRoll`, `sixSidedDiceRoll` also has the same return type. This function has something called a **_side effect_** in the sense that it also writes something to an "external environment" outside the software. In this case the external environment is the console or the terminal where this value can be displayed. 

We can notice that we are using the same type multiple times. Since we do not like to repeat ourselves in our code to protect it from being error-prone and messy, we try to write things once and then reuse them everywhere it is needed. In this case, we can do the following to simplify the type declarations.

```typescript

type ThreeDDice = 1 | 2 | 3 | 4 | 5 | 6;

function randomOnetoSix(): ThreeDDice {
    return Math.floor(Math.random() * 10) % 6 + 1;
}

function sixSidedDiceRoll(): ThreeDDice {
    const roll: ThreeDDice = randomOnetoSix();
    console.log("Rolled number is: ", roll);
    return roll;
} 

```

Apart from literals, we also have object types in typescript. An object type has a set of keys and values as opposed to a primitive const which has just one name and value.

For example, the function `val` below returns an **_object_** which has a **_key_** named `u` with value of some 
type `U` and it is "**readonly**" which means that this value comes with an assurance that nothing else in the program will be "writing" some new value to this attribute - so that it will not suddenly change to something else and cause unnecessary problems.

```typescript
interface Val<U> {
  readonly u: U;
}

function val<U>(u: U): Val<U> {
    return ({u}); // short for { u: u } 
  // i.e add a key named u, give it the value that u from input currently has
}

const example = val(42);
console.log("Example: ", example.u);
```

We can also have an `interface` or "schema" or "structure" for an `object` that just "names" the type of thing it has. This is the approach taken by nominative type systems but on a more fundamental layer during compilation.

```typescript
export interface Nom<U>{
  readonly type: string;
}
```

Here are some naming related code puns:

```typescript
export interface Chomsky<U> extends Nom<U>, Val<U> {
}

const chomsky: Nom<string> & Val<string> = {
  type: "Nom Nom Nom",
  u: "some string"
};

const cloneChomsky: Chomsky<string> = {
  type: "Noam Noam Noam",
  u: "some string"
}

console.log("Are the values of the u attribute the same?");
console.log(cloneChomsky.u === chomsky.u);

console.log("Are the values of the type attribute the same?")
console.log(chomsky.type === cloneChomsky.type);

console.log("Are the types the same?", 42 === 42); // yup
```

This interface has everything that the `Nom<U>` interface has and also has everything that the `Val<U>` interface has. However, we are not adding any new things of its own to this interface. Therefore, the space inside the braces for the interface `Chomsky<U>` can be left empty.
