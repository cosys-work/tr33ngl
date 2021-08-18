import { Component, Input } from "@angular/core";

@Component({
  selector: 'cosys-graph-div',
  templateUrl: './graph-div.component.html',
  styleUrls: ['./graph-div.component.scss']
})
export class GraphDivComponent {

  @Input("title") title: string = 'Meta';

}
