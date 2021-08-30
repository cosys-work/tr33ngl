import { Injectable, OnInit } from "@angular/core";
import { BehaviorSubject, timer } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SidebarTogglrService implements OnInit {

  isColPSD = false;
  isCollapsed = new BehaviorSubject<boolean>(false);

  toggleCollapsed(_: Event) {
    this.isColPSD = !this.isCollapsed.value;
    this.isCollapsed.next(this.isColPSD);
  }

  ngOnInit(): void {
    timer(3000).subscribe(() => {
      this.isColPSD = true;
      this.isCollapsed.next(this.isColPSD);
    })
  }
}
