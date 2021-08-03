import { LayoutModule } from "@angular/cdk/layout";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ComponentFixture, inject, TestBed, waitForAsync } from "@angular/core/testing";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatMenuModule } from "@angular/material/menu";

import { GridComponent } from "./grid.component";
import { GridService } from "./grid.service";
import { BreakpointsService } from "../breakpoints.service";

describe('GridComponent', () => {
  let component: GridComponent;
  let fixture: ComponentFixture<GridComponent>;
  let service: GridService;
  let breakpointsService: BreakpointsService;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [GridComponent],
      imports: [
        BrowserAnimationsModule,
        LayoutModule,
        MatButtonModule,
        MatCardModule,
        MatGridListModule,
        MatIconModule,
        MatMenuModule,
      ],
      providers: [
        GridService,
        BreakpointsService
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    inject(
      [GridService, BreakpointsService],
      (svc: GridService, bp: BreakpointsService) => {
      service = svc;
      breakpointsService = bp;
    });
    fixture = TestBed.createComponent(GridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should compile', () => {
    console.log("svc", service.gridMaker());
    expect(component).toBeTruthy();
  });
});
