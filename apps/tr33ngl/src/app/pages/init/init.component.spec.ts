import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitComponent } from './init.component';
import { LayoutModule } from "../../layout/layout.module";
import { GalleryModule } from "../gallery/gallery.module";

describe('InitComponent', () => {
  let component: InitComponent;
  let fixture: ComponentFixture<InitComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ InitComponent ],
      imports: [
        LayoutModule,
        GalleryModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(InitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
