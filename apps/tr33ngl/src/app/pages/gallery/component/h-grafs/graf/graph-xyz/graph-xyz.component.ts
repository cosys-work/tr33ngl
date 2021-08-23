import { Component, Input, OnInit } from "@angular/core";
import { GrafStore } from "@cosys/func";

declare const vis: any;

interface OnAble {
  on: (selector: string, cb: (params: unknown) => void) => void
}

@Component({
  selector: 'cosys-graph-xyz',
  templateUrl: './graph-xyz.component.html',
  styleUrls: ['./graph-xyz.component.scss']
})
export class GraphXyzComponent implements OnInit {
  @Input("selector") selector: number = 0;
  public network!: OnAble;

  constructor(
    private grafStore: GrafStore
  ) {
    this.grafStore = grafStore;
  }

  ngOnInit() {
    this.loadVisTree(this.getTreeData(), this.selector);     // RENDER STANDARD NODES WITH TEXT LABEL
  }

  loadVisTree(treeData: unknown, selector: number) {
    const options = {
      interaction: {
        hover: true,
      },
      manipulation: {
        enabled: true
      },
      height: '250px',
      width: '600px',
      clickToUse: true
    };
    console.log("networks", document.getElementsByClassName("network"));
    const container = document.getElementsByClassName("network")[selector];
    this.network = new vis.Network(container, treeData, options);

    this.network.on("hoverNode", function (params: unknown) {
      console.log('hoverNode Event:', params);
    });

    this.network.on("blurNode", function(params: unknown) {
      console.log('blurNode event:', params);
    });
  }

  getTreeData() {
    const grafState = this.grafStore.state.graph;
    const nodes = grafState.nodes.value;

    // create an array with edges
    const edges = grafState.edges.value;

    return ({
      nodes,
      edges
    });
  }
}
