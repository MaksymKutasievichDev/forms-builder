import { Directive } from "@angular/core";
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from "@angular/forms";
import { createPasswordStrangeValidator } from "../validators/password-strange.validator";

@Directive({
  selector: "[passwordStrength]",
  providers: [{
    provide: NG_VALIDATORS,
    useExisting: PasswordStrengthDirective,
    multi: true
  }]
})
export class PasswordStrengthDirective implements Validator{

  validate(control: AbstractControl): ValidationErrors | null {
    return createPasswordStrangeValidator()(control)
  }

}
