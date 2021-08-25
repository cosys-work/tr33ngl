import { Component } from "@angular/core";
import { FormlyFieldConfig } from "@ngx-formly/core";
import { FormGroup } from "@angular/forms";

@Component({
  selector: 'cosys-form-eta',
  templateUrl: './form-eta.component.html',
  styleUrls: ['./form-eta.component.scss']
})
export class FormEtaComponent {

  form = new FormGroup({});
  model = { email: 'e@mail.com' };
  fields: FormlyFieldConfig[] = [
    {
      key: 'email',
      type: 'input',
      templateOptions: {
        label: 'Email address',
        placeholder: 'Enter email',
        required: true,
      }
    }
  ];

  onSubmit() {
    if (this.form.valid) {
      console.log("valid", JSON.stringify(this.model));
    }
    console.log("invalid");
  }

}
