import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphXyzComponent } from './graph-xyz.component';

describe('GraphXyzComponent', () => {
  let component: GraphXyzComponent;
  let fixture: ComponentFixture<GraphXyzComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphXyzComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphXyzComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
