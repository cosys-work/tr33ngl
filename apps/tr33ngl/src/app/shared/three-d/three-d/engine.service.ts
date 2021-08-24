import * as THREE from "three";
import { ElementRef, Injectable, NgZone, OnDestroy } from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class EngineService implements OnDestroy {

  private canvas!: HTMLCanvasElement;
  private renderer!: THREE.WebGLRenderer;
  private camera!: THREE.PerspectiveCamera;
  private scene!: THREE.Scene;
  private frameId!: number;

  public constructor(
    private ngZone: NgZone
  ) {}

  public ngOnDestroy(): void {
    if (this.frameId !== undefined) {
      cancelAnimationFrame(this.frameId);
    }
  }

  adderToScene(): THREE.Scene {
    const scene = this.scene;
    const meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
    const sphere = new THREE.Mesh( new THREE.SphereGeometry( 5 ), meshMaterial );
    sphere.position.set( -15, 15, 15 );
    scene.add( sphere );

    const icosahedron = new THREE.Mesh( new THREE.IcosahedronGeometry( 5 ), meshMaterial );
    icosahedron.position.set( 15, 15, -15 );
    scene.add( icosahedron );

    const torus = new THREE.Mesh( new THREE.TorusGeometry( 5, 3 ), meshMaterial );
    torus.position.set( -15, 15, -15 );
    scene.add( torus );

    const cylinder = new THREE.Mesh( new THREE.CylinderGeometry( 5, 5, 5 ), meshMaterial );
    cylinder.position.set( 15, -15, 15 );
    scene.add( cylinder );

    const circle = new THREE.Mesh( new THREE.CircleGeometry( 5 ), meshMaterial );
    circle.position.set( -15, -15, 15 );
    scene.add( circle );

    const octahedron = new THREE.Mesh( new THREE.OctahedronGeometry( 5 ), meshMaterial );
    octahedron.position.set( 15, -15, -15 );
    scene.add( octahedron );

    const torusKnot = new THREE.Mesh( new THREE.TorusKnotGeometry( 5, 1 ), meshMaterial );
    torusKnot.position.set( -15, -15, -15 );
    scene.add( torusKnot );

    const geometry = new THREE.PlaneGeometry( 1, 1 );
    const material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
    const plane = new THREE.Mesh( geometry, material );
    this.scene.add( plane );

    return scene;
  }

  renderScene() {
    this.renderer = new THREE.WebGLRenderer({
      canvas: this.canvas,
      alpha: true,    // transparent background
      antialias: true // smooth edges
    });
    this.renderer.setSize(700, 350);

    // create the scene
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(
      75, 16 / 9, 0.1, 1000
    );
    this.camera.position.set( 0, 0, 25 );
    this.camera.lookAt( new THREE.Vector3( 0, 0, 0 ) );
    this.scene.add(this.camera);
  }

  public createScene(canvas: ElementRef<HTMLCanvasElement>): void {
    this.canvas = canvas.nativeElement;
    this.renderScene();
    this.adderToScene();
  }

  public animate(): void {
    // We have to run this outside angular zones,
    // because it could trigger heavy changeDetection cycles.
    this.ngZone.runOutsideAngular(() => {
      if (document.readyState !== 'loading') {
        this.render();
      } else {
        window.addEventListener('DOMContentLoaded', () => {
          this.render();
        });
      }

      window.addEventListener('resize', () => {
        this.resize();
      });
    });
  }

  public render(): void {
    this.frameId = requestAnimationFrame(() => {
      this.render();
    });
    this.renderer.render(this.scene, this.camera);
  }

  public resize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(width, height);
  }
}
