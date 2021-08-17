import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StepsComponent } from './steps.component';
import { MatStepperModule } from "@angular/material/stepper";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { SyncKVComponent, SyncKVComponentStub } from "../sync-kv.abstract";
import { ImagesStore } from "../../../../../shared/stores/images.store";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('StepsComponent', () => {
  let component: StepsComponent;
  let fixture: ComponentFixture<StepsComponent>;
  let service: ImagesStore;

  beforeEach(async () => {
    service = new ImagesStore();
    await TestBed.configureTestingModule({
      declarations: [ StepsComponent ],
      imports: [
        MatStepperModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: SyncKVComponent, useClass: SyncKVComponentStub
        },
        {
          provide: ImagesStore, useValue: service
        }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(StepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
