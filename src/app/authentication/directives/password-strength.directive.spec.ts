import {ComponentFixture, TestBed} from "@angular/core/testing";
import {FormControl, FormsModule, ReactiveFormsModule} from "@angular/forms";
import {Component} from "@angular/core";
import {PasswordStrengthDirective} from "./password-strength.directive";

@Component({
  template: `
    <form>
      <input type="text" [formControl]="password" passwordStrength>
    </form>
  `
})
class TestComponent {
  password = new FormControl('')
}

describe('PasswordStrengthDirective', () => {
  let component: TestComponent
  let fixture:ComponentFixture<TestComponent>

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, PasswordStrengthDirective],
      imports:[
        FormsModule,
        ReactiveFormsModule
      ],
      providers: [
      ]
    }).compileComponents()

    fixture = TestBed.createComponent(TestComponent)
    component = fixture.componentInstance
    fixture.detectChanges()
  })

  it('should be applied to an input field with the passwordStrength attribute',() => {
    const inputElement = fixture.debugElement.nativeElement.querySelector('input[passwordStrength]');
    expect(inputElement).toBeTruthy();
  });

  it('should return ValidationErrors object when validate() is called with invalid input', () => {
    component.password.setValue('password');
    const errors = component.password.errors;
    expect(errors).toEqual({ passwordStrength: true });
  });

  it('should not return ValidationErrors object when validate() is called with valid input', () => {
    component.password.setValue('password1Aa');
    const errors = component.password.errors;
    expect(errors).toBeNull();
  });
})



