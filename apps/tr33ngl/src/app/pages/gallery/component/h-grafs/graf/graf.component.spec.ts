import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrafComponent } from './graf.component';

describe('GrafComponent', () => {
  let component: GrafComponent;
  let fixture: ComponentFixture<GrafComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrafComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrafComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
