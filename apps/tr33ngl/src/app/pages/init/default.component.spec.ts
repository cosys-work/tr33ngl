import { ComponentFixture, TestBed } from "@angular/core/testing";

import { DefaultComponent } from "./default.component";
import { GalleryModule } from "../gallery/gallery.module";
import { LayoutModule } from "../../layout/layout.module";

describe('DefaultComponent', () => {
  let component: DefaultComponent;
  let fixture: ComponentFixture<DefaultComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DefaultComponent ],
      imports: [
        LayoutModule,
        GalleryModule
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DefaultComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
