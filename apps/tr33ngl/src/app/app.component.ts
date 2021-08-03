import { Component } from '@angular/core';
import { Message } from "@cosys/api-interfaces";
import { HttpClient } from "@angular/common/http";

@Component({
  selector: 'cosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  isCollapsed = false;
  readonly hello$ = this.http.get<Message>("/api/hello");

  constructor(private http: HttpClient) {}
}
