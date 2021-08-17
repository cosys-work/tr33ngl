// assoc bin op

import { AssocGroupoidal } from "../lib/type-bazaar/groupoid";
import { AbstractMonoid } from "../lib/type-bazaar/monoid";

export class Semigroup<T> extends AbstractMonoid<T> implements AssocGroupoidal<T> {}
