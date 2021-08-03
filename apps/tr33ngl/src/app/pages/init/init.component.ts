import { Component, OnInit } from "@angular/core";
import { GridService } from "../../layout/grid/grid.service";
import { Grid } from "../../shared/models/grid.model";

@Component({
  selector: "cosys-init",
  templateUrl: "./init.component.html",
  styleUrls: ["./init.component.scss"],
})
export class InitComponent implements OnInit {
  headers = ["Deck", "Current", "Keys", "Duals"];

  constructor(private gridService: GridService) {}

  ngOnInit() {
    const grid: Grid = this.gridService.grid.value;

    this.gridService.grid.next({
      ...grid,
      cards: grid.cards.map((card, index) => {
        return {
          ...card,
          title: this.headers[index],
          contents: { someKey: "someVal" },
        };
      }),
    });
  }

  onActivate(event: Event) {
    console.log("activated", event);
  }

  onDeactivate(event: Event) {
    console.log("deactivated", event)
  }
}
