import { Injectable } from "@angular/core";
import { Edge, Edges, Graph, Node, Nodes } from "../../models/h-graph.model";
import { HGraph, Listoid } from "@cosys/func";

@Injectable({
  providedIn: 'root'
})
export class GrafInitService {
  private nodes!: Nodes;
  private edges!: Edges;
  private graf!: HGraph<Node, Edge>;

  init( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes = nodes;
    this.edges = edges;
    this.graf = new HGraph<Node, Edge>(nodes.value, edges.value)
  }

  makeGraph(nodes: Nodes, edges: Edges): Graph {
    const ret = [
      nodes,
      edges
    ];
    return Object.assign({}, ...ret, { edges, nodes })
  }

  createDefault(): Graph {
    console.log("#TODO");
    const nodes: Nodes = new Listoid<Node[]>(this.seedNodes);
    const edges: Edges = new Listoid<Edge[]>(this.seedEdges);
    return this.makeGraph(nodes, edges);
  }

  get seedNodes(): Node[] {
    return [
      {id: '1', label: 'Node 1', title: 'I am node 1!'},
      {id: '2', label: 'Node 2', title: 'I am node 2!'},
      {id: '3', label: 'Node 3', title: 'ma 3'},
      {id: '4', label: 'Node 4', title: 'ma 4'},
      {id: '5', label: 'Node 5', title: 'ma 5'}
    ];
  }

  get seedEdges(): Edge[] {
    const ret = {
      edges: [
        { from: 1, to: 3 },
        { from: 1, to: 2 },
        { from: 2, to: 4 },
        { from: 2, to: 5 }
      ]
    };
    return Object.assign({}, ...ret.edges, {});
  }

  get graph(): Graph {
    const edges = this.edges.value;
    const nodes = this.nodes.value;
    return this.makeGraph(new Listoid(nodes), new Listoid(edges));
  }

  get hGraph(): HGraph<Node, Edge> {
    return new HGraph<Node, Edge>(this.nodes.value, this.edges.value);
  }
}
