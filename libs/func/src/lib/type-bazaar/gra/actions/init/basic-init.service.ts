import { SeedInitService, HEdges as Edges, HNodes as Nodes, HGGraph as Graph } from "@cosys/func";

export class BasicInitService {

  constructor(private seedInit: SeedInitService) {
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
