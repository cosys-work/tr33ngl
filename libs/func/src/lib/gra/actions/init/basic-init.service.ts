import { HEdges as Edges, HGGraph as Graph, HNodes as Nodes } from "../../../examples/models/h-graph.model";
import { SeedInitService } from "./seed-init.service";

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
