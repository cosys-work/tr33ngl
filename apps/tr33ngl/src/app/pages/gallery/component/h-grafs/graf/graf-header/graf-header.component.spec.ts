import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafHeaderComponent } from './graf-header.component';

describe('GrafHeaderComponent', () => {
  let component: GrafHeaderComponent;
  let fixture: ComponentFixture<GrafHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafHeaderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
