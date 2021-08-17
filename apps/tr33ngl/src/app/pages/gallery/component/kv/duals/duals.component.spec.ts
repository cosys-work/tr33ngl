import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DualsComponent } from './duals.component';
import { MatExpansionModule } from "@angular/material/expansion";
import { SyncKVComponent, SyncKVComponentStub } from "../sync-kv.abstract";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

describe('DualsComponent', () => {
  let component: DualsComponent;
  let fixture: ComponentFixture<DualsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DualsComponent ],
      imports: [
        MatExpansionModule,
        BrowserAnimationsModule
      ],
      providers: [
        {
          provide: SyncKVComponent, useClass: SyncKVComponentStub
        }
      ]
    }).compileComponents();
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
