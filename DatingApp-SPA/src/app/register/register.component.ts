import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
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

  model: any = {};

  constructor(private authService: AuthService, private alertifyService: AlertifyService) { }

  ngOnInit() {
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)},
      this.passwordConfrimMatcher);
  }

  passwordConfrimMatcher(formGroup: FormGroup) {
    return formGroup.get('password').value === formGroup.get('confirmPassword').value ? null : {mismatch : true};
  }

  register() {
    // this.authService.register(this.model).subscribe(() => {
    //   this.alertifyService.success('registration success');
    // }, error => {
    //   this.alertifyService.error(error);
    // });
    console.log(this.registerForm);
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
