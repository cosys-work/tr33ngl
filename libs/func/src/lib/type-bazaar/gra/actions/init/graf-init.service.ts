import {
  BasicInitService,
  HEdge as Edge,
  HEdges as Edges,
  HGGraph as Graph,
  HGraph,
  HNode as Node,
  HNodes as Nodes,
  makeGraphoid,
  Phoid
} from "@cosys/func";

export class GrafInitService {

  private readonly nodes: Nodes = [];
  private readonly edges: Edges = [];

  constructor(private graphInit: BasicInitService) {
    this.graphInit = graphInit;
  }

  add( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes.push(...nodes);
    this.edges.push(...edges);
  }

  get isInitialized(): boolean {
    return (!!this.edges?.length && !!this.nodes?.length);
  }

  get graph(): Graph {
    return this.isInitialized ?
      this.graphInit.makeGraph(this.nodes, this.edges) :
      this.graphInit.makeDefault();
  }

  get metaState(): Phoid {
    return makeGraphoid(this.graph.nodes, this.graph.edges);
  }

  get hGraph(): HGraph<Node, Edge> {
    return new HGraph<Node, Edge>(this.graph.nodes, this.graph.edges);
  }
}
