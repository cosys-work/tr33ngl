// import { Injectable } from "@angular/core";
// import * as THREE from "three";
// import { changeEvent, config3, STATE } from "./config/config";
// import { DomHandlers, DomHandlersService } from "./events/dom-handlers.service";
//
//
// @Injectable({
//   providedIn: 'root'
// })
// export class AxisEngineService extends THREE.EventDispatcher {
//
//   // Add some objects to the scene, one per quadrant
//   readonly meshMaterial = new THREE.MeshBasicMaterial({ color: 0xFF00FF, wireframe: true });
//
//   readonly dispatcher!: THREE.EventDispatcher;
//
//   readonly config: typeof config3;
//
//   domElement!: HTMLElement;
//
//   constructor(
//     protected fDom: DomHandlersService
//   ) {
//     super();
//     this.config = config3;
//     THREE.EventDispatcher.call(this);
//     this.addListeners();
//   }
//
//   init(
//     object: THREE.PerspectiveCamera
//   ) {
//     this.config.object = object;
//   }
//
//   addListeners() {
//     document.addEventListener( 'contextmenu', function ( event: Event ) { event.preventDefault(); }, false );
//
//     document.addEventListener( 'mousedown', this.fDom.mousedown, false );
//
//     document.addEventListener( 'wheel', this.fDom.mousewheel, false );
//
//     document.addEventListener( 'touchstart', this.fDom.touchstart, false );
//     document.addEventListener( 'touchend', this.fDom.touchend, false );
//     document.addEventListener( 'touchmove', this.fDom.touchmove, false );
//
//     document.addEventListener( 'keydown', this.fDom.keydown, false );
//     document.addEventListener( 'keyup', this.fDom.keyup, false );
//     this.handleResize();
//   }
//
//
//
//   handleResize() {
//     this.config.screen.width = this.domElement.clientWidth;
//     this.config.screen.height = this.domElement.clientHeight;
//
//     this.config.screen.offsetLeft = 0;
//     this.config.screen.offsetTop = 0;
//
//     this.config.radius = ( this.config.screen.width + this.config.screen.height ) / 4;
//   }
//
//   handleEvent( event: { type: string; } ) {
//
//     const events: DomHandlers = {
//       keyup: (e: KeyboardEvent) => this.fDom.keyup(e),
//       keydown: (e: KeyboardEvent) => this.fDom.keydown(e),
//       mousedown: (e: MouseEvent) => this.fDom.mousedown(e),
//       mousemove: (e: MouseEvent) => this.fDom.mousemove(e),
//       mouseup: (e: MouseEvent) => this.fDom.mouseup(e),
//       mousewheel: (e: WheelEvent) => this.fDom.mousewheel(e),
//       touchstart: (e: TouchEvent) => this.fDom.touchstart(e),
//       touchmove: (e: TouchEvent) => this.fDom.touchmove(e),
//       touchend: (e: TouchEvent) => this.fDom.touchend(e),
//     }
//
//     if(Object.keys(events).includes(event.type)) {
//       (events as any)[event.type](event);
//     }
//   }
//
//   rotateCamera() {
//
//     const angle = Math.acos(
//       this.config._rotateStart.dot( this.config._rotateEnd ) /
//       this.config._rotateStart.length() / this.config._rotateEnd.length()
//     );
//
//     if ( angle ) {
//
//       const axis = ( new THREE.Vector3() ).crossVectors( this.config._rotateStart,this.config._rotateEnd ).normalize(),
//         quaternion = new THREE.Quaternion();
//
//       const ang = this.config.rotateSpeed * angle;
//
//       quaternion.setFromAxisAngle( axis, -ang );
//
//       this.config._eye.applyQuaternion( quaternion );
//       this.config.object.up.applyQuaternion( quaternion );
//
//       this.config._rotateEnd.applyQuaternion( quaternion );
//
//       if ( this.config.staticMoving ) {
//
//         this.config._rotateStart.copy( this.config._rotateEnd );
//
//       } else {
//
//         quaternion.setFromAxisAngle( axis, angle * ( this.config.dynamicDampingFactor - 1.0 ) );
//         this.config._rotateStart.applyQuaternion( quaternion );
//
//       }
//
//     }
//
//   }
//
//   zoomCamera() {
//
//     if ( this.config._state === STATE.TOUCH_ZOOM ) {
//
//       const factor = this.config._touchZoomDistanceStart / this.config._touchZoomDistanceEnd;
//       this.config._touchZoomDistanceStart = this.config._touchZoomDistanceEnd;
//       this.config._eye.multiplyScalar( factor );
//
//     } else {
//
//       const factor = 1.0 + ( this.config._zoomEnd.y - this.config._zoomStart.y ) * this.config.zoomSpeed;
//
//       if ( factor !== 1.0 && factor > 0.0 ) {
//
//         this.config._eye.multiplyScalar( factor );
//
//         if ( this.config.staticMoving ) {
//
//           this.config._zoomStart.copy( this.config._zoomEnd );
//
//         } else {
//
//           this.config._zoomStart.y += ( this.config._zoomEnd.y - this.config._zoomStart.y ) * this.config.dynamicDampingFactor;
//
//         }
//
//       }
//
//     }
//
//   }
//
//   panCamera() {
//
//     const mouseChange = this.config._panEnd.clone().sub( this.config._panStart );
//
//     if ( mouseChange.lengthSq() ) {
//
//       mouseChange.multiplyScalar( this.config._eye.length() * this.config.panSpeed );
//
//       const pan = this.config._eye.clone().cross( this.config.object.up ).setLength( mouseChange.x );
//       pan.add( this.config.object.up.clone().setLength( mouseChange.y ) );
//
//       this.config.object.position.add( pan );
//       this.config.target.add( pan );
//
//       if ( this.config.staticMoving ) {
//
//         this.config._panStart = this.config._panEnd;
//
//       } else {
//
//         this.config._panStart.add( mouseChange.subVectors( this.config._panEnd, this.config._panStart ).multiplyScalar( this.config.dynamicDampingFactor ) );
//
//       }
//
//     }
//
//   }
//
//   checkDistances() {
//
//     if ( !this.config.noZoom || !this.config.noPan ) {
//
//       if ( this.config.object.position.lengthSq() > this.config.maxDistance * this.config.maxDistance ) {
//
//         this.config.object.position.setLength( this.config.maxDistance );
//
//       }
//
//       if ( this.config._eye.lengthSq() < this.config.minDistance * this.config.minDistance ) {
//
//         this.config.object.position.addVectors( this.config.target, this.config._eye.setLength( this.config.minDistance ) );
//
//       }
//
//     }
//
//   }
//
//   update() {
//
//     this.config._eye.subVectors( this.config.object.position, this.config.target );
//
//     if ( !this.config.noRotate ) {
//
//       this.rotateCamera();
//
//     }
//
//     if ( !this.config.noZoom ) {
//
//       this.zoomCamera();
//
//     }
//
//     if ( !this.config.noPan ) {
//
//       this.panCamera();
//
//     }
//
//     this.config.object.position.addVectors( this.config.target, this.config._eye );
//
//     this.checkDistances();
//
//     this.config.object.lookAt( this.config.target );
//
//     if ( this.config.lastPosition.distanceToSquared( this.config.object.position ) > 0 ) {
//
//       this.dispatchEvent( changeEvent );
//
//       this.config.lastPosition.copy( this.config.object.position );
//
//     }
//
//   }
//
//   dispatchEvent(event: { type: string }) {
//     return new Event(event.type);
//   }
// }
