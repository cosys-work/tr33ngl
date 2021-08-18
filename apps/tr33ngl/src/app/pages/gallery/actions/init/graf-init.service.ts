import { Injectable } from "@angular/core";
import { Edge, Edges, Graph, Node, Nodes } from "../../models/h-graph.model";
import { HGraph, Listoid } from "@cosys/func";
import { SimpleGraphInit } from "./simple-graph-init";

@Injectable({
  providedIn: 'root'
})
export class GrafInitService {

  private readonly nodes: Nodes = new Listoid<Node[]>([]);
  private readonly edges: Edges = new Listoid<Edge[]>([]);

  prepend( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes.value = [...this.nodes.value, ...nodes.value];
    this.edges.value = [...this.edges.value, ...edges.value];
  }

  append( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes.value = [...nodes.value, ...this.nodes.value];
    this.edges.value = [...edges.value, ...this.edges.value];
  }

  get graph(): Graph {
    return SimpleGraphInit.makeGraph(this.nodes, this.edges);
  }

  get hGraph(): HGraph<Node, Edge> {
    return new HGraph<Node, Edge>(this.nodes.value, this.edges.value);
  }
}
