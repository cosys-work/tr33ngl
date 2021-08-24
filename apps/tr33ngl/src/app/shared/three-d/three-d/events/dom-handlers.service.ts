import { Injectable } from '@angular/core';
import { config3, STATE } from "../config/config";
import { DomHandlerUtilsService } from "./dom-handler-utils.service";

export interface DomHandlers {
  keyup: (e: any) => void,
  keydown: (e: any) => void,
  mousedown: (e: any) => void,
  mousemove: (e: any) => void,
  mouseup: (e: any) => void,
  mousewheel: (e: any) => void,
  touchstart: (e: any) => void,
  touchmove: (e: any) => void,
  touchend: (e: any) => void
}

@Injectable({
  providedIn: 'root'
})
export class DomHandlersService implements DomHandlers {

  private readonly config: typeof config3;

  constructor(protected utils: DomHandlerUtilsService) {
    this.config = config3;
  }

  keydown( event: KeyboardEvent ) {
    if ( !this.config.enabled ) return;

    window.removeEventListener( 'keydown', this.keydown );

    this.config._prevState = this.config._state;

    if (  this.config._prevState !== STATE.NONE ) {
      return;
    } else if ( event.code === this.config.keys[ STATE.ROTATE ] && !this.config.noRotate ) {
      this.config._state = STATE.ROTATE;
    } else if ( event.code === this.config.keys[ STATE.ZOOM ] && !this.config.noZoom ) {
      this.config._state = STATE.ZOOM;
    } else if ( event.code === this.config.keys[ STATE.PAN ] && !this.config.noPan ) {
      this.config._state = STATE.PAN;
    }
  }

  keyup( _: KeyboardEvent) {

    if ( !this.config.enabled ) return;

    this.config._state = this.config._prevState;

    window.addEventListener( 'keydown', this.keydown, false );

  }

  mousedown( event: MouseEvent) {

    if ( !this.config.enabled ) return;

    event.preventDefault();
    event.stopPropagation();

    if ( this.config._state === STATE.NONE ) {
      this.config._state = event.button;
    }

    if ( this.config._state === STATE.ROTATE && !this.config.noRotate ) {
      this.config._rotateStart = this.config._rotateEnd = this.utils.getMouseProjectionOnBall( event.clientX, event.clientY );
    } else if ( this.config._state === STATE.ZOOM && !this.config.noZoom ) {
      this.config._zoomStart = this.config._zoomEnd = this.utils.getMouseOnScreen( event.clientX, event.clientY );
    } else if ( this.config._state === STATE.PAN && !this.config.noPan ) {
      this.config._panStart = this.config._panEnd = this.utils.getMouseOnScreen( event.clientX, event.clientY );
    }
    document.addEventListener( 'mousemove', this.mousemove, false );
    document.addEventListener( 'mouseup', this.mouseup, false );
  }

  mousemove( event: MouseEvent ) {

    if ( !this.config.enabled ) return;

    event.preventDefault();
    event.stopPropagation();

    if ( this.config._state === STATE.ROTATE && !this.config.noRotate ) {

      this.config._rotateEnd = this.utils.getMouseProjectionOnBall( event.clientX, event.clientY );

    } else if ( this.config._state === STATE.ZOOM && !this.config.noZoom ) {

      this.config._zoomEnd = this.utils.getMouseOnScreen( event.clientX, event.clientY );

    } else if ( this.config._state === STATE.PAN && !this.config.noPan ) {

      this.config._panEnd = this.utils.getMouseOnScreen( event.clientX, event.clientY );

    }

  }

  mouseup( event: MouseEvent ) {

    if ( !this.config.enabled ) return;

    event.preventDefault();
    event.stopPropagation();

    this.config._state = STATE.NONE;

    document.removeEventListener( 'mousemove', this.mousemove );
    document.removeEventListener( 'mouseup', this.mouseup );

  }

  mousewheel( event: WheelEvent ) {

    if ( !this.config.enabled ) return;

    event.preventDefault();
    event.stopPropagation();

    if ( event.deltaX || event.deltaY || event.deltaZ ) { // WebKit / Opera / Explorer 9
      this.config.delta = Math.sqrt(event.deltaX ^ 2 + event.deltaY ^ 2) / 40;
    } else if ( event.detail ) { // Firefox
      this.config.delta = - event.detail / 3;
    }
    this.config._zoomStart.y += ( 1 / this.config.delta ) * 0.05;
  }

  touchstart( event: TouchEvent ) {

    if ( !this.config.enabled ) return;

    switch ( event.touches.length ) {

      case 1:
        this.config._state = STATE.TOUCH_ROTATE;
        this.config._rotateStart = this.config._rotateEnd = this.utils.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:
        this.config._state = STATE.TOUCH_ZOOM;
        const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        this.config._touchZoomDistanceEnd = this.config._touchZoomDistanceStart = Math.sqrt( dx * dx + dy * dy );
        break;

      case 3:
        this.config._state = STATE.TOUCH_PAN;
        this.config._panStart = this.config._panEnd = this.utils.getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      default:
        this.config._state = STATE.NONE;

    }

  }

  touchmove( event: TouchEvent ) {

    if ( !this.config.enabled ) return;

    event.preventDefault();
    event.stopPropagation();

    switch ( event.touches.length ) {

      case 1:
        this.config._rotateEnd = this.utils.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:
        const dx = event.touches[ 0 ].pageX - event.touches[ 1 ].pageX;
        const dy = event.touches[ 0 ].pageY - event.touches[ 1 ].pageY;
        this.config._touchZoomDistanceEnd = Math.sqrt( dx * dx + dy * dy )
        break;

      case 3:
        this.config._panEnd = this.utils.getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      default:
        this.config._state = STATE.NONE;

    }

  }

  touchend( event: TouchEvent ) {

    if ( !this.config.enabled ) return;

    switch ( event.touches.length ) {

      case 1:
        this.config._rotateStart = this.config._rotateEnd = this.utils.getMouseProjectionOnBall( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

      case 2:
        this.config._touchZoomDistanceStart = this.config._touchZoomDistanceEnd = 0;
        break;

      case 3:
        this.config._panStart = this.config._panEnd = this.utils.getMouseOnScreen( event.touches[ 0 ].pageX, event.touches[ 0 ].pageY );
        break;

    }

    this.config._state = STATE.NONE;

  }
}
