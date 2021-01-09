import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-valid-input',
  templateUrl: './valid-input.component.html',
  styleUrls: ['./valid-input.component.scss']
})
export class ValidInputComponent {
  @Input() control: FormControl;
  @Input() placeholder: string;
  @Input() inputType = 'text';
  constructor() { }

  public showError() {
    const { dirty, touched, errors } = this.control;
    return dirty && touched && errors;
  }
}
