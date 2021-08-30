import { AfterViewInit, Component, OnInit } from "@angular/core";
import { GraForceService } from "./gra-force.service";
import { WebglDetectorService } from "../../../../../../shared/three-d/three-d/webgl-detector.service";


@Component({
  selector: 'cosys-gra-force',
  templateUrl: './gra-force.component.html',
  styleUrls: ['./gra-force.component.scss'],
  providers: [GraForceService]
})
export class GraForceComponent implements OnInit, AfterViewInit {

  constructor(
    private _: GraForceService,
    private detector: WebglDetectorService
  ) {}

  ngOnInit() {
    if ( !this.detector.webgl ) this.detector.addGetWebGLMessage();
  }

  ngAfterViewInit() {
    this._.ngAfterViewInit();
  }

  toggleData($event: any) {
    this._.toggleData($event);
  }

}
