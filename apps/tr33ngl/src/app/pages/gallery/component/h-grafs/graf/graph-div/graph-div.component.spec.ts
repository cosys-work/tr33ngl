import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphDivComponent } from './graph-div.component';

describe('GraphDivComponent', () => {
  let component: GraphDivComponent;
  let fixture: ComponentFixture<GraphDivComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraphDivComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphDivComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
