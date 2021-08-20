import { HEdges as Edges, HGGraph as Graph, HNodes as Nodes, SeedInitService } from "@cosys/func";

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
      this.seedInit.seedNodes().value,
      this.seedInit.seedEdges().value
    );
  }

}
