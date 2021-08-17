# Types and Types Driven Development

```Typescript
export type FType<V> = V;
export type FList<Type> = Array<FType>; 
export type FStruct<Type> = List<[Type, FType<Type>]>;
```


