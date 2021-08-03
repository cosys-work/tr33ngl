import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SlidesComponent } from './slides.component';
import { NgImageSliderModule } from "ng-image-slider";
import { MatProgressBarModule } from "@angular/material/progress-bar";

describe('SlidesComponent', () => {
  let component: SlidesComponent;
  let fixture: ComponentFixture<SlidesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SlidesComponent ],
      imports: [
        NgImageSliderModule,
        MatProgressBarModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SlidesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
