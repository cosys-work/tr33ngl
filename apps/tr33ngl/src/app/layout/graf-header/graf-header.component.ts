import { Component, OnInit } from "@angular/core";
import { SidebarTogglrService } from "../../shared/services/root/sidebar-togglr.service";

@Component({
  selector: 'cosys-graf-header',
  templateUrl: './graf-header.component.html',
  styleUrls: ['./graf-header.component.scss'],
})
export class GrafHeaderComponent implements OnInit {

  constructor(public togglr: SidebarTogglrService) {}

  ngOnInit(): void {
    this.togglr.ngOnInit();
  }
}
