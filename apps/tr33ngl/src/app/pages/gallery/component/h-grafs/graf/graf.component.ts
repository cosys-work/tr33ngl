import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from "@angular/core";

@Component({
  selector: 'cosys-graf',
  templateUrl: './graf.component.html',
  styleUrls: ['./graf.component.scss'],
  encapsulation: ViewEncapsulation.Emulated,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GrafComponent {
  @Input('title') title: string[] = ["Duals", "Meta"]
}
