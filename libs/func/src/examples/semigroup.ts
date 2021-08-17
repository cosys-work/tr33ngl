// assoc bin op

import { AssocGroupoidal } from "../lib/type-bazaar/groupoid";
import { AbstractMonoid } from "./mono";

export class Semigroup<T> extends AbstractMonoid<T> implements AssocGroupoidal<T> {}
