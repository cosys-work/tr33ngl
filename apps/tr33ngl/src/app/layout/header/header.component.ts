import { Component } from "@angular/core";

@Component({
  selector: "cosys-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"],
})
export class HeaderComponent {
  canShowAlert = false;

  className = "";

  onDarkening(): void {
    this.className = this.className === "darkMode" ? "" : "darkMode";
  }
}
