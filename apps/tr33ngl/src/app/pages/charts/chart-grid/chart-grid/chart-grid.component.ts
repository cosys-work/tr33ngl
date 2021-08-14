import { Component } from "@angular/core";
import { NzMarks } from "ng-zorro-antd/slider";

@Component({
  selector: 'cosys-chart-grid',
  templateUrl: './chart-grid.component.html',
  styleUrls: ['./chart-grid.component.scss']
})
export class ChartGridComponent {
  index1 = 0;
  index2 = 0;

  hGutter = 16;
  vGutter = 16;
  count = 4;
  array = new Array(this.count);
  marksHGutter: NzMarks = {
    8: '8',
    16: '16',
    24: '24',
    32: '32',
    40: '40',
    48: '48'
  };
  marksVGutter: NzMarks = {
    8: '8',
    16: '16',
    24: '24',
    32: '32',
    40: '40',
    48: '48'
  };
  marksCount: NzMarks = {
    2: '2',
    3: '3',
    4: '4',
    6: '6',
    8: '8',
    12: '12'
  };
  reGenerateArray(count: number): void {
    this.array = new Array(count);
  }
}
