import { Injectable } from "@angular/core";
import { Cartesian, Grid, GridMaker } from "../../shared/models/grid.model";
import { BehaviorSubject } from "rxjs";
import { BreakpointsService } from "../breakpoints.service";

@Injectable({
  providedIn: "root",
})
export class GridService {
  public grid: BehaviorSubject<Grid>;
  public isSmall = false;

  private gridDefaults = {
    isSmall: this.isSmall,
  };

  private addContents: (small?: boolean) => Grid = (small) => {
    this.isSmall = small || this.isSmall;
    const cards = small ? this.smallScreenCards() : this.largeScreenCards();

    return <Grid>{
      ...this.gridDefaults,
      cards: cards.map((card, index) => ({
        ...card,
        title: `Title of Card ${index}`,
        contents: { someKey: "someVal" }, //TODO update this
      })),
    };
  };

  constructor(private breakpointsService: BreakpointsService) {
    this.grid = new BehaviorSubject<Grid>(this.addContents(false));
    breakpointsService.isHandsetModeObs.subscribe(({ matches }) => {
      this.isSmall = matches;
      this.grid.next(this.addContents(this.isSmall));
    });
  }

  // TODO Configure the grid columns and rows for small screens here
  private smallScreenCards: () => Cartesian[] = () => [
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
  ];

  // TODO Configure the grid columns and rows for large screens here
  private largeScreenCards: () => Cartesian[] = () => [
    { cols: 2, rows: 1 },
    { cols: 1, rows: 2 },
    { cols: 1, rows: 1 },
    { cols: 1, rows: 1 },
  ];

  public gridMaker: GridMaker = (forceSmallness?) => {
    const small = forceSmallness ?? this.isSmall;
    this.grid.next(this.addContents(small));
    return this.grid;
  };
}
