import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphXyComponent } from './graph-xy.component';

describe('GraphXyComponent', () => {
  let component: GraphXyComponent;
  let fixture: ComponentFixture<GraphXyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphXyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphXyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
