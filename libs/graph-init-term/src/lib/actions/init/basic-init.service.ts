import { HEdges as Edges, HNodes as Nodes, HGGraph as Graph } from "@cosys/func";
import { SeedInit } from "./seed-init.service";

export class BasicInit {

  constructor(private seedInit: SeedInit) {
    this.seedInit = seedInit;
  }

  public makeGraph(nodes: Nodes, edges: Edges): Graph {
    const ret = [
      nodes,
      edges
    ];
    return Object.assign({}, ...ret, { edges, nodes })
  }

  public makeDefault(): Graph {
    return this.makeGraph(
      this.seedInit.seedNodes(),
      this.seedInit.seedEdges()
    );
  }

}
