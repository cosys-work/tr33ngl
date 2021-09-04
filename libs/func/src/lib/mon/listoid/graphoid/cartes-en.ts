import { Nominator } from "../../../utils/nominators";
import { Listoid } from "../listoid";
import {Ts} from "../../../util";


export interface Cartesian {
  readonly x: number;
  readonly y: number;
  readonly z: number;
}

export interface SpaceCoordinate extends Cartesian {
  i: (xDelta: number) => number;
  j: (yDelta: number) => number;
  k: (zDelta: number) => number;
}

export interface TimeCoordinate extends SpaceCoordinate {
  t: (tDelta: BigInt) => BigInt;
}

export type TimeCoordinates = TimeCoordinate[];

export class CartesianPlaneIndex implements TimeCoordinate {

  readonly td!: BigInt;

  t(tDelta: BigInt): BigInt {
    return BigInt(Number(tDelta) + Number(this.td));
  }

  i(xDelta: number): number {
    return xDelta + this.x;
  }

  j(yDelta: number): number {
    return yDelta + this.y;
  }

  k(zDelta: number): number {
    return zDelta + this.z;
  }

  readonly x!: number;
  readonly y!: number;
  readonly z!: number;

  constructor(td: BigInt, x: number, y: number, z: number) {
    this.td = td;
    this.x = x;
    this.y = y;
    this.z = z;
  }

}

export class DiscreteCartesianPlane implements Nominator<DiscreteCartesianPlane> {
  type: "DiscreteCartesianPlane" = "DiscreteCartesianPlane";
  value: DiscreteCartesianPlane = this;
  indices: Listoid<CartesianPlaneIndex>;

  constructor(indexes: Ts<CartesianPlaneIndex>) {
    this.indices = new Listoid(indexes);
  }
}
