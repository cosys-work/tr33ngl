import { HEdge as Edge, HEdges as Edges, HNode as Node, HNodes as Nodes } from "@cosys/func";
import { $di, $id, Listoid } from "../../../../mon/listoid";

export class SeedInitService {

  public nodeMaker(iz: number): Node {
    const node = (ix: number) => ({
      id: `${ix}`,
      label: `Label ${ix}`,
      title: `Title ${ix}`,
      tag: `Tag ${ix}`
    });
    const nodeWithId = (iy: number) => {
      const nodeIdd = node(iy);
      return {
        [$id]: nodeIdd,
        ...nodeIdd
      };
    };
    return nodeWithId(iz);
  }

  public edgeMaker(iz: number): Edge {
    const edge =
      (ix: number) => (
        {
          from: `${ix}`,
          to: `${ix + 1}`,
          at: `${ix} => ${ix+1}`,
          ...this.nodeMaker(ix)
        });
    const edgeWithDi = (iy: number) => {
      const edgeY = edge(iy);
      return  {
        [$di]: new Listoid(edgeY),
        ...edgeY,
      };
    }
    return edgeWithDi(iz);
  }

  public seedNodes(): Listoid<Nodes> {
    const nodes = Array(5)
      .fill(1 )
      .map((_, i) => this.nodeMaker(i));
    return new Listoid<Node[]>(nodes);
  }

  public seedEdges(): Listoid<Edges> {
    const edges = Array(5)
      .fill(1 )
      .map((_, i) => this.edgeMaker(i));
    return new Listoid<Edge[]>(edges);
  }

}
