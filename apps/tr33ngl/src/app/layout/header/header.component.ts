import { Component } from "@angular/core";
import { ClarityIcons, lightbulbIcon, organizationIcon } from "@cds/core/icon";

@Component({
  selector: "cosys-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  canShowAlert = false;

  className = "";

  constructor() {
    ClarityIcons.addIcons(lightbulbIcon, organizationIcon);
  }

  onDarkening(): void {
    this.className = this.className === "darkMode" ? "" : "darkMode";
  }
}
