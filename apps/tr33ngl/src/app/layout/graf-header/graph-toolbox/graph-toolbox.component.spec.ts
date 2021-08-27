import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphToolboxComponent } from './graph-toolbox.component';

describe('GraphToolboxComponent', () => {
  let component: GraphToolboxComponent;
  let fixture: ComponentFixture<GraphToolboxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphToolboxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphToolboxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
