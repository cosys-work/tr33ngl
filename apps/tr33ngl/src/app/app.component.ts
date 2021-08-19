import { Component, OnInit } from "@angular/core";
import { Message } from "@cosys/api-interfaces";
import { HttpClient } from "@angular/common/http";
import { BehaviorSubject, timer } from "rxjs";

@Component({
  selector: 'cosys-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  isColPSD = false;
  isCollapsed = new BehaviorSubject<boolean>(false);
  readonly hello$ = this.http.get<Message>("/api/hello");

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    console.log("called ");
    timer(3000).subscribe(() => {
      this.isColPSD = true;
      this.isCollapsed.next(this.isColPSD);
      console.log("nexted ");
    })
  }

  toggleCollapsed(_: Event) {
    this.isColPSD = !this.isCollapsed.value;
    this.isCollapsed.next(this.isColPSD);
  }

}
