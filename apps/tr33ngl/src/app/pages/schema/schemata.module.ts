import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { FormEtaComponent } from "./form-eta/form-eta.component";
import { NgxFormlyAntdGridModule } from "ngx-formly-antd/grid";
import { FormlyModule } from "@ngx-formly/core";
import { ReactiveFormsModule } from "@angular/forms";
import { NzCheckboxModule } from "ng-zorro-antd/checkbox";
import { NzButtonModule } from "ng-zorro-antd/button";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzProgressModule } from "ng-zorro-antd/progress";
import { NzStepsModule } from "ng-zorro-antd/steps";
import { NzTabsModule } from "ng-zorro-antd/tabs";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzTypographyModule } from "ng-zorro-antd/typography";
import { NzAutocompleteModule } from "ng-zorro-antd/auto-complete";
import { NzI18nModule } from "ng-zorro-antd/i18n";
import { NzToolTipModule } from "ng-zorro-antd/tooltip";
import { NzTimePickerModule } from "ng-zorro-antd/time-picker";
import { NzInputNumberModule } from "ng-zorro-antd/input-number";
import { NzCodeEditorModule } from "ng-zorro-antd/code-editor";
import { NzContextMenuServiceModule } from "ng-zorro-antd/dropdown";
import { RouterModule, Routes } from "@angular/router";

const COMPS = [
  FormEtaComponent
];

export const MODS_FORM_COMPS= [
  NzCheckboxModule,
  NzButtonModule,
  NzDatePickerModule,
  NzTimePickerModule,
  NzFormModule,
  NzIconModule,
  NzDividerModule,
  NzAutocompleteModule,
  NzToolTipModule,
  NzInputNumberModule,
  NzCodeEditorModule,
];

export const MODS_FORM_UIX = [
  NzProgressModule,
  NzTabsModule,
  NzGridModule,
  NzStepsModule,
];

export const MODS_FORM_CONFIG = [
  ReactiveFormsModule,
  FormlyModule.forChild(),
  NzContextMenuServiceModule,
  NzI18nModule,
  NzTypographyModule,
  NgxFormlyAntdGridModule,
]

const routes: Routes = [
  {
    path: 'eta',
    component: FormEtaComponent
  }
];

@NgModule({
  declarations: [
    ...COMPS
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    ...MODS_FORM_CONFIG,
    ...MODS_FORM_COMPS,
    ...MODS_FORM_UIX,
  ],
  exports: [
    ...COMPS
  ]
})
export class SchemataModule { }
