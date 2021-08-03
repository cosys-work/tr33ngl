import { Component, Input, TemplateRef } from "@angular/core";
import { GridService } from "./grid.service";

@Component({
  selector: "cosys-grid",
  templateUrl: "./grid.component.html",
  styleUrls: ["./grid.component.scss"],
})
export class GridComponent {
  // TODO check bug regarding breakpoint service not triggering UI update
  grid = this.gridService.gridMaker();

  panelOpenState = false;

  @Input() items!: Record<string, unknown>[];
  @Input() itemTemplates!: TemplateRef<HTMLElement>[];

  constructor(private gridService: GridService) {}
}
