import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartGridComponent } from './chart-grid.component';

describe('ChartGridComponent', () => {
  let component: ChartGridComponent;
  let fixture: ComponentFixture<ChartGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartGridComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
