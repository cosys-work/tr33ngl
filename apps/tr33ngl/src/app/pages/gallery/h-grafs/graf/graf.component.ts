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

  ngOnInit() {
    this.network = this.drawSvgNetwork();  // DRAW SVG WITH CUSTOM HTML

    const treeData = this.getTreeData();
    this.loadVisTree(treeData);     // RENDER STANDARD NODES WITH TEXT LABEL
  }

  loadVisTree(treeData: unknown) {
    const options = {
      interaction: {
        hover: true,
      },
      manipulation: {
        enabled: true
      }
    };
    const container = document.getElementById('myNetwork');
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
    return {
      nodes: nodes,
      edges: edges
    };
  }

  drawSvgNetwork() {
    const nodes = [];
    const edges = []

    const svg = '<svg xmlns="http://www.w3.org/2000/svg" width="390" height="65">' +
      '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
      '<foreignObject x="15" y="10" width="100%" height="100%">' +
      '<div xmlns="http://www.w3.org/1999/xhtml" style="font-family:Arial; font-size:30px">' +
      ' <em>I</em> am' +
      '<span style="color:white; text-shadow:0 0 20px #000000;">' +
      ' HTML in SVG!</span>' +

      // * THIS IMAGE IS NOT RENDERING *
      '<i style="background-image: url(https://openclipart.org/download/280615/July-4th-v2B.svg);"></i>' +

      '</div>' +
      '</foreignObject>' +
      '</svg>';


    const url = "data:image/svg+xml;charset=utf-8,"+ encodeURIComponent(svg);

// Create a data table with nodes.

    nodes.push({id: 1, label: 'Get HTML', image: url, shape: 'image'});
    nodes.push({id: 2, label: 'Using SVG', image: url, shape: 'image'});
    edges.push({from: 1, to: 2, length: 300});

    // create a network
    // const container = this.mySvgNetwork.nativeElement;

    const container = document.getElementById('mySvgNetwork');
    const data = {
      nodes: nodes,
      edges: edges
    };

    const options = {
      physics: {stabilization: false},
      edges: {smooth: false}
    };

    return new vis.Network(container, data, options);
  }
}
