import { Component } from "@angular/core";
import { Message } from "@cosys/api-interfaces";
import { HttpClient } from "@angular/common/http";
import { SidebarTogglrService } from "./shared/services/root/sidebar-togglr.service";

@Component({
  selector: 'cosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  readonly hello$ = this.http.get<Message>("/api/hello");

  constructor(private http: HttpClient, public togglr: SidebarTogglrService) {}

}
