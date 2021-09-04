import { Component, Input, OnInit } from "@angular/core";
import { GrafStore } from "../../../../../../store/graf-store.service";

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
  ) {}

  ngOnInit() {
    this.loadVisTree(this.getTreeData(), this.selector);
    this.loadVisTree(this.getTreeData(), 1);
  }

  loadVisTree(treeData: unknown, selector: number) {
    const options = {
      interaction: {
        hover: true,
      },
      manipulation: {
        enabled: true
      },
      height: '350px',
      width: '700px',
      clickToUse: true
    };
    const container = document.getElementsByClassName("network")[selector];
    this.network = new vis.Network(container, treeData, options);

    this.network.on("deselectNode", function (params: unknown) {
      console.log('deselectNode Event:', params);
    });

    this.network.on("deselectEdge", function(params: unknown) {
      console.log('deselectEdge event:', params);
    });

    this.network.on("selectNode", function (params: unknown) {
      console.log('selectNode event', params);
    });

    this.network.on("selectEdge", function (params: unknown) {
      console.log('selectEdge event', params);
    });
  }

  getTreeData() {
    const grafState = this.grafStore.state;
    const nodes = grafState.nodes.u.value;
    const edges = grafState.edges.u.value;
    return ({
      nodes,
      edges
    });
  }
}
