import {
  Directive,
  Input,
  OnInit,
} from '@angular/core';
import { FormGroup, Validators } from '@angular/forms';
import { debounceTime, distinctUntilChanged, filter } from 'rxjs/operators';

@Directive({
  selector: '[appPasswordMatchingValidator]',
})
export class PasswordMatchingValidatorDirective
  extends Validators
  implements OnInit {
  @Input() formGroup: FormGroup;

  public ngOnInit() {
    this.formGroup.valueChanges.pipe(
      filter(value => !!value),
      debounceTime(1000),
      distinctUntilChanged()
    ).subscribe(value => {
      const { password, confirmPassword } = value;
      if (password === confirmPassword) {
        this.formGroup.setErrors(null);
        return;
      }
      this.formGroup.setErrors({ notMatchingPassword: true });
    });
  }
}
