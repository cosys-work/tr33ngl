import { Injectable } from "@angular/core";
import { Edges, Graph, Nodes } from "../../models/h-graph.model";
import { HGraph, Listoid } from "@cosys/func";

@Injectable({
  providedIn: 'root'
})
export class GrafInitService {
  private nodes!: Listoid<Nodes>;
  private edges!: Listoid<Edges>;
  private graf!: HGraph<Nodes, Edges>;

  init( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes = new Listoid<Nodes>(nodes);
    this.edges = new Listoid<Edges>(edges);
    this.graf = new HGraph<Nodes, Edges>([nodes], [edges])
  }

  createDefault() {
    console.log("#TODO");
  }

  get seedNodes() {
    return [
      {id: 1, label: 'Node 1', title: 'I am node 1!'},
      {id: 2, label: 'Node 2', title: 'I am node 2!'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ];
  }

  get seedEdges() {
    return [
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ];
  }

  get graph(): Graph {
    const edges = this.edges;
    const nodes = this.nodes;
    const ret = [
      nodes,
      edges
    ];
    return Object.assign({}, ...ret, { edges, nodes });
  }

  get hGraph(): HGraph<Nodes, Edges> {
    return new HGraph<Nodes, Edges>(this.graph.nodes.value, this.graph.edges.value);
  }
}
