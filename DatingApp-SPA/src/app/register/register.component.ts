import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AbstractControl, AbstractControlOptions, FormBuilder,
  FormControl, FormGroup, ValidationErrors,
  ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { User } from '../_models/user';
import { AlertifyService } from '../_services/alertify.service';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  registerForm: FormGroup;
  maxDate: Date;
  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService,
    private router: Router, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.createRegisterForm();
    this.maxDate = new Date();
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18);
  }

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      gender: ['male'],
      username: ['', Validators.required],
      knowAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: ['', [Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8),
        this.passwordPatternValidator(/\d/, { needNumber: true }),
        this.passwordPatternValidator(/[A-Z]/, { hasUpperCase: true }),
        this.passwordPatternValidator(/[a-z]/, { hasLowerCase: true }),
        this.passwordPatternValidator(/[-._!"`'#%&,:;<>=@{}~\$\(\)\*\+\/\\\?\[\]\^\|]+/, { hasSpecialCharacters: true })]],
      confirmPassword: ['', [Validators.required /*, this.passwordConfirmMatcher('password')*/]]
    } , {
      validators: this.passwordConfirmMatcher2
    } as AbstractControlOptions
    //↑ https://stackoverflow.com/questions/65594627/angular-formbuilder-group-is-deprecated
    );
  }

  // passwordConfrimMatcher(formGroup: FormGroup) {
  //   return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {mismatch : true};
  // }

  passwordConfirmMatcher(matchTo: string): ValidatorFn {
    return (control: AbstractControl) =>
      control?.value === control?.parent?.controls[matchTo].value ? null : {mismatch: true};
  }

//↓ https://codinglatte.com/posts/angular/cool-password-validation-angular/
  passwordPatternValidator(regex: RegExp, error: ValidationErrors): ValidatorFn {
    return (control: AbstractControl): {[key: string]: any} => {
      if (!control.value) {
        return null;
      }
      return regex.test(control.value) ? null : error;
    };
  }

  passwordConfirmMatcher2(control: AbstractControl) {
    return control.get('password').value === control.get('confirmPassword').value ?
      null : control.get('confirmPassword').setErrors({mismatch: true});
  }
//↑ https://codinglatte.com/posts/angular/cool-password-validation-angular/

  register() {
    if(this.registerForm.valid) {
      const user: User = Object.assign({}, this.registerForm.value);
      this.authService.register(user).subscribe(() => {
        this.alertifyService.success('registion success');
      }, error => {
        this.alertifyService.error('registion failed');
      }, () => {
        this.authService.loggin(user).subscribe(() => {
          this.router.navigate(['/members']);
        });
      });
    }
    //console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
