import { Edge, Edges, Node, Nodes } from "../../models/h-graph.model";
import { $di, $id, Listoid } from "@cosys/func";

export class SeedInit {

  public static nodeMaker(iz: number): Node {
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

  public static edgeMaker(iz: number): Edge {
    const edge =
      (ix: number) => (
        {
          from: `${ix}`,
          to: `${ix + 1}`,
          ...SeedInit.nodeMaker(ix)
        });
    const edgeWithDi = (iy: number) => {
      const edgeY = edge(iy);
      return  {
        [$di]: new Listoid([edgeY]),
        ...edgeY,
      };
    }
    return edgeWithDi(iz);
  }

  public static seedNodes(): Nodes {
    const nodes = Array(5)
      .fill(1 )
      .map((_, i) => SeedInit.nodeMaker(i));
    return new Listoid<Node[]>(nodes);
  }

  public static seedEdges(): Edges {
    const edges = Array(5)
      .fill(1 )
      .map((_, i) => SeedInit.edgeMaker(i));
    return new Listoid<Edge[]>(edges);
  }

}
