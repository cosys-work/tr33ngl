import { HEdges as Edges, HNodes as Nodes, HGGraph as Graph } from "@cosys/func";
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
