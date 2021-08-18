import { Injectable } from "@angular/core";
import { Edge, Edges, Graph, Node, Nodes } from "../../models/h-graph.model";
import { HGraph } from "@cosys/func";
import { SimpleGraphInit } from "./simple-graph-init";

@Injectable({
  providedIn: 'root'
})
export class GrafInitService {
  private nodes!: Nodes;
  private edges!: Edges;

  init( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes = nodes;
    this.edges = edges;
  }

  get graph(): Graph {
    return SimpleGraphInit.makeGraph(this.nodes, this.edges);
  }

  get hGraph(): HGraph<Node, Edge> {
    return new HGraph<Node, Edge>(this.nodes.value, this.edges.value);
  }
}
