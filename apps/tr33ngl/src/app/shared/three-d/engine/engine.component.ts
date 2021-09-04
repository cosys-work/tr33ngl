import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { EngineService } from "./engine.service";
import { WebglDetectorService } from "../three-d/webgl-detector.service";


@Component({
  selector: 'cosys-engine',
  templateUrl: './engine.component.html',
  styleUrls: ['./engine.component.scss'],
  providers: [EngineService]
})
export class EngineComponent implements OnInit {

  @ViewChild('rendererCanvas', {static: true})
  public rendererCanvas!: ElementRef<HTMLCanvasElement>;

  public constructor(
    private engServ: EngineService,
    private detector: WebglDetectorService
  ) {}

  public ngOnInit(): void {
    if ( !this.detector.webgl ) {
      this.detector.addGetWebGLMessage();
    }
    this.engServ.createScene(this.rendererCanvas);
    this.engServ.animate();
  }

}
