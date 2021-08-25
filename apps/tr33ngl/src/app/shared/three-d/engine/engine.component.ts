import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EngineService } from "../three-d/engine.service";
import { WebglDetectorService } from "../three-d/webgl-detector.service";


@Component({
  selector: 'cosys-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss']
})
export class EngineComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(
    private engServ: EngineService,
    private detector: WebglDetectorService
  ) {}

  public ngOnInit(): void {
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
    if ( !this.detector.webgl ) this.detector.addGetWebGLMessage();
  }

}
