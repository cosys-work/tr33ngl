import {
  BasicInitService,
  HEdge as Edge,
  HEdges as Edges,
  HGGraph as Graph,
  HGraph,
  HNode as Node,
  HNodes as Nodes,
  Listoid,
  makeGraphoid,
  Phoid
} from "@cosys/func";

export class GrafInitService {

  private readonly nodes: Nodes = new Listoid<Node[]>([]);
  private readonly edges: Edges = new Listoid<Edge[]>([]);

  constructor(private graphInit: BasicInitService) {
    this.graphInit = graphInit;
  }

  add( graph: { nodes: Nodes, edges: Edges} ) {
    const { nodes, edges } = graph;
    this.nodes.value.push(...nodes.value);
    this.edges.value.push(...edges.value);
  }

  get isInitialized(): boolean {
    return (!!this.edges?.value?.length && !!this.nodes?.value?.length);
  }

  get graph(): Graph {
    return this.isInitialized ?
      this.graphInit.makeGraph(this.nodes, this.edges) :
      this.graphInit.makeDefault();
  }

  get metaState(): Phoid {
    return makeGraphoid(this.graph.nodes.value, this.graph.edges.value);
  }

  get hGraph(): HGraph<Node, Edge> {
    return new HGraph<Node, Edge>(this.graph.nodes.value, this.graph.edges.value);
  }
}
