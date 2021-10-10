import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormEtaComponent } from './form-eta.component';

describe('FormEtaComponent', () => {
  let component: FormEtaComponent;
  let fixture: ComponentFixture<FormEtaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormEtaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormEtaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
