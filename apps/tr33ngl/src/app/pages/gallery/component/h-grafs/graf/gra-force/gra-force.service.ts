import { AfterViewInit, Injectable, NgZone } from "@angular/core";
import ForceGraph3D, { ForceGraph3DInstance } from "3d-force-graph";
import * as THREE from "three";
import { csvParse } from "d3-dsv";
import { interval } from "rxjs";

export interface Described<U> {
  obj: U;
  description: string;
}

export type GraphMorphism = (graph: ForceGraph3DInstance) => ForceGraph3DInstance;

@Injectable()
export class GraForceService implements AfterViewInit {

  private curDataSetIdx!: number;

  private readonly dataSets!: Described<(graph: any) => any>[];
  private readonly graphFunc: ForceGraph3DInstance = ForceGraph3D();
  graphFuncCache!: ForceGraph3DInstance;

  private frameId!: number;
  private readonly graphElem: () => HTMLElement = () => document.getElementById("threeDGraph")!;
  private readonly graphDataElem: () => HTMLElement = () => document.getElementById("graphDataDescription")!;

  constructor(private ngZone: NgZone) {
    this.dataSets = this.getGraphDataSets();
  }


  public ngOnDestroy(): void {
    if (this.frameId !== undefined) {
      cancelAnimationFrame(this.frameId);
    }
  }

  config(fg3dI: ForceGraph3DInstance): ForceGraph3DInstance {
    return fg3dI.width(700).height(350).backgroundColor("#000000").showNavInfo(false);
  }

  private graphFuncDefault(): ForceGraph3DInstance {
    this.graphFuncCache = this.config(this.graphFunc(this.graphElem()));
    return this.graphFuncCache;
  }

  ngAfterViewInit(): void {
    this.toggleData();
    this.graphFuncDefault();
    this.animate();
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => this.rotate());
  }

  private rotate() {
    const quaternion = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(0, 1, 0), 0.1);
    interval(1000).subscribe((_) => {
      if (!!this.graphFuncCache.setRotationFromQuaternion) {
        console.log("git gud");
        this.graphFuncCache.setRotationFromQuaternion(quaternion);
      }
    });

  }

  toggleData = (_?: unknown) => {
    this.curDataSetIdx = this.curDataSetIdx === undefined ?
      0 :
      (this.curDataSetIdx + 1) % this.dataSets.length;

    const dataSet: Described<(graph: any) => any> = this.dataSets[this.curDataSetIdx];

    this.graphFunc.resetProps(); // Wipe current state

    dataSet.obj(this.graphFunc); // Load data set

    //
    this.graphDataElem().innerHTML = dataSet?.description ?
      `${dataSet?.description}` :
      '';

    this.config(this.graphFunc);
  }


  getGraphDataSets(): Array<Described<(graph: any) => any>> {

    const describer: <U>(obj: U, description: string) => Described<U> = <U>(obj: U, description: string) => ({ ...{ obj }, ...{ description } });

    const loadMiserablesDescription = "Les Mis";
    const loadMiserables: GraphMorphism = (graph: any) =>
      graph
        .cooldownTicks(200)
        .nodeLabel('id')
        .nodeAutoColorBy('group')
        .forceEngine('ngraph')
        .jsonUrl('./assets/json/miserables.json');
    const miserables: Described<GraphMorphism> = describer(loadMiserables, loadMiserablesDescription);

    //
    const loadD3DependenciesDescription = "D3";
    const loadD3Dependencies = (graph: ForceGraph3DInstance) => {
      return fetch('./assets/csv/d3Deps.csv').then(r => r.text()).then((v) => csvParse(v)).then((data: any) => {
        const nodes: { path: any; leaf: any; module: any; size: number; }[] = [];
        const links: { source: any; target: any; }[] = [];
        data.forEach((v: any) => {
          const { size, path } = v;
          const levels = path.split('/'),
            module = levels.length > 1 ? levels[1] : null,
            leaf = levels.pop(),
            parent = levels.join('/');

          nodes.push({
            path,
            leaf,
            module,
            size: +size || 1
          });

          if (parent) {
            links.push({ source: parent, target: path});
          }
        });

        return graph
          .cooldownTicks(300)
          .nodeRelSize(0.5)
          .nodeId('path')
          .nodeVal('size')
          .nodeLabel('path')
          .nodeAutoColorBy('module')
          .forceEngine('ngraph')
          .graphData({ nodes: nodes, links: links });
      });
    };
    const d3Deps: Described<typeof loadD3Dependencies> = describer(loadD3Dependencies, loadD3DependenciesDescription);

    const loadTunnelDescription = "Time";
    const loadTunnel: GraphMorphism  = (graph: any) => {

      const perimeter = 12, length = 30;

      const getId = (col: string | number, row: string | number) => `${col},${row}`;

      const nodes = [];
      const links = [];
      for (let colIdx=0; colIdx<perimeter; colIdx++) {
        for (let rowIdx=0; rowIdx<length; rowIdx++) {
          const id = getId(colIdx, rowIdx);
          nodes.push({id});

          // Link vertically
          if (rowIdx>0) {
            links.push({ source: getId(colIdx, rowIdx-1), target: id });
          }

          // Link horizontally
          links.push({ source: getId((colIdx || perimeter) - 1, rowIdx), target: id });
        }
      }

      return graph
        .cooldownTicks(300)
        .forceEngine('ngraph')
        .graphData({ nodes: nodes, links: links });
    };

    const tunnel: Described<typeof loadTunnel> = describer(loadTunnel, loadTunnelDescription);

    //

    return [miserables, d3Deps, tunnel];
  }

}
