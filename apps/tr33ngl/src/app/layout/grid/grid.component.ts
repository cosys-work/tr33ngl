import { Component, Input, TemplateRef } from "@angular/core";
import { GridService } from "./grid.service";
import { map } from "rxjs/operators";
import { Observable } from "rxjs";
import { Card } from "../../shared/models/grid.model";

@Component({
  selector: "cosys-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent {
  // TODO check bug regarding breakpoint service not triggering UI update
  grid: Observable<Card[]>;
  panelOpenState = false;

  @Input() items!: Record<string, unknown>[];
  @Input() itemTemplates!: TemplateRef<HTMLElement>[];

  constructor(private gridService: GridService) {
    this.grid = this.gridService.gridMaker(false)
      .pipe(map((v) => v.cards));
  }
}
