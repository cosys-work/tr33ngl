import { ChangeDetectionStrategy, Component, OnInit, ViewEncapsulation } from "@angular/core";

declare const vis: any;

interface OnAble {
  on: (selector: string, cb: (params: unknown) => void) => void
}

@Component({
  selector: 'cosys-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrafComponent implements OnInit {

  public network!: OnAble;
  xyz = [0, 1, 2];

  index = 0;

  defSpin = false;

  onIndexChange(event: number): void {
    this.index = event;
  }

  ngOnInit() {
    this.loadVisTree(this.getTreeData(), 'myNetwork');     // RENDER STANDARD NODES WITH TEXT LABEL
    this.loadVisTree(this.getTreeData(), 'myMetaNetwork');     // RENDER STANDARD NODES WITH TEXT LABEL
  }

  loadVisTree(treeData: unknown, selector: string) {
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
    const container = document.getElementById(selector);
    this.network = new vis.Network(container, treeData, options);

    this.network.on("hoverNode", function (params: unknown) {
      console.log('hoverNode Event:', params);
    });

    this.network.on("blurNode", function(params: unknown) {
      console.log('blurNode event:', params);
    });
  }

  getTreeData() {
    const nodes =[
      {id: 1, label: 'Node 1', title: 'I am node 1!'},
      {id: 2, label: 'Node 2', title: 'I am node 2!'},
      {id: 3, label: 'Node 3'},
      {id: 4, label: 'Node 4'},
      {id: 5, label: 'Node 5'}
    ];

    // create an array with edges
    const edges = [
      {from: 1, to: 3},
      {from: 1, to: 2},
      {from: 2, to: 4},
      {from: 2, to: 5}
    ];

    return ({
      nodes,
      edges
    });
  }
}
