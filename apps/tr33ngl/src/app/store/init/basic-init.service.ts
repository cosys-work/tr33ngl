import { HEdges as Edges, HGGraph as Graph, HNodes as Nodes } from "@cosys/func";
import { SeedInitService } from "./seed-init.service";
import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
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
