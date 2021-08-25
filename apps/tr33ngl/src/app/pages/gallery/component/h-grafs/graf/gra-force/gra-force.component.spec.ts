import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GraForceComponent } from './gra-force.component';

describe('GraForceComponent', () => {
  let component: GraForceComponent;
  let fixture: ComponentFixture<GraForceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GraForceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GraForceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
