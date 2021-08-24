// import { Injectable } from '@angular/core';
// import * as THREE from "three";
// import { config3 } from "../config/config";
//
// @Injectable({
//   providedIn: 'root'
// })
// export class DomHandlerUtilsService {
//
//   readonly config: typeof config3;
//
//   constructor() {
//     this.config = config3;
//   }
//
//   getMouseOnScreen( clientX: number, clientY: number ) {
//
//     return new THREE.Vector2(
//       ( clientX - this.config.screen.offsetLeft ) / this.config.radius * 0.5,
//       ( clientY - this.config.screen.offsetTop ) / this.config.radius * 0.5
//     );
//
//   }
//
//   getMouseProjectionOnBall( clientX: number, clientY: number ) {
//
//     const mouseOnBall = new THREE.Vector3(
//       ( clientX - this.config.screen.width * 0.5 - this.config.screen.offsetLeft ) / this.config.radius,
//       ( this.config.screen.height * 0.5 + this.config.screen.offsetTop - clientY ) / this.config.radius,
//       0.0
//     );
//
//     const length = mouseOnBall.length();
//
//     if ( length > 1.0 ) {
//
//       mouseOnBall.normalize();
//
//     } else {
//
//       mouseOnBall.z = Math.sqrt( 1.0 - length * length );
//
//     }
//
//     this.config._eye.copy( this.config.object.position ).sub( this.config.target );
//
//     const projection = this.config.object.up.clone().setLength( mouseOnBall.y );
//     projection.add( this.config.object.up.clone().cross( this.config._eye ).setLength( mouseOnBall.x ) );
//     projection.add( this.config._eye.setLength( mouseOnBall.z ) );
//
//     return projection;
//
//   }
// }
