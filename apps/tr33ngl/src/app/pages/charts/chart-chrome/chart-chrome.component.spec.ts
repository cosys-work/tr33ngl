import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChartChromeComponent } from './chart-chrome.component';

describe('ChartChromeComponent', () => {
  let component: ChartChromeComponent;
  let fixture: ComponentFixture<ChartChromeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ChartChromeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ChartChromeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
