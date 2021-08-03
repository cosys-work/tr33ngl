import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualsComponent } from './duals.component';

describe('DualsComponent', () => {
  let component: DualsComponent;
  let fixture: ComponentFixture<DualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DualsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DualsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
