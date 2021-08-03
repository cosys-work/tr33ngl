import { Injectable } from "@angular/core";
import { BreakpointObserver, Breakpoints } from "@angular/cdk/layout";

@Injectable({
  providedIn: "root",
})
export class BreakpointsService {
  public isHandsetModeObs = this.breakpointObserver.observe(
    Breakpoints.Handset
  );

  constructor(private breakpointObserver: BreakpointObserver) {}
}
