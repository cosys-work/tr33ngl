import { Injectable } from "@angular/core";
import { Edge, Edges, Graph, Node, Nodes } from "../../models/h-graph.model";
import { HGraph, Listoid } from "@cosys/func";
import { GraphInit } from "./graph-init";
import { SeedInit } from "./seed-init";

@Injectable({
  providedIn: 'root'
})
export class GrafInitService {

  private readonly nodes: Nodes = new Listoid<Node[]>([]);
  private readonly edges: Edges = new Listoid<Edge[]>([]);

  public static graphInit = GraphInit;
  public static seedInit = SeedInit;

  append( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes.value = [...this.nodes.value, ...nodes.value];
    this.edges.value = [...this.edges.value, ...edges.value];
  }

  prepend( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes.value = [...nodes.value, ...this.nodes.value];
    this.edges.value = [...edges.value, ...this.edges.value];
  }

  get isInitialized() {
    return (this.edges.value.length && this.nodes.value.length);
  }

  get graph(): Graph {
    return this.isInitialized ?
      GrafInitService.graphInit.makeGraph(this.nodes, this.edges) :
      GrafInitService.graphInit.makeDefault();
  }

  get hGraph(): HGraph<Node, Edge> {
    return this.isInitialized ?
      new HGraph<Node, Edge>(this.nodes.value, this.edges.value) :
      new HGraph<Node, Edge>(this.graph.nodes.value, this.graph.edges.value);
  }
}
