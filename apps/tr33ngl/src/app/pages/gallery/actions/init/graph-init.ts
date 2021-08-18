import { Edges, Graph, Nodes } from "../../models/h-graph.model";
import { SeedInit } from "./seed-init";

export class GraphInit {

  public static makeGraph(nodes: Nodes, edges: Edges): Graph {
    const ret = [
      nodes,
      edges
    ];
    return Object.assign({}, ...ret, { edges, nodes })
  }

  public static makeDefault(): Graph {
    return GraphInit.makeGraph(
      SeedInit.seedNodes(),
      SeedInit.seedEdges()
    );
  }

}
