import { async, TestBed } from "@angular/core/testing";
import { GraphInitTermModule } from "@cosys/graphoidal";

describe("GraphInitTermModule", () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [GraphInitTermModule],
    }).compileComponents();
  }));

  // TO DO: Add real tests here.
  //
  // NB: This particular test does not do anything useful.
  //     It does NOT check for correct instantiation of the module.
  it("should have a module definition", () => {
    expect(GraphInitTermModule).toBeDefined();
  });
});
