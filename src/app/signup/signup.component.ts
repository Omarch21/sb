import { Component,OnInit } from '@angular/core';
import { AuthenticationService } from 'src/services/authentication.service';
import {
  AbstractControl,
  FormControl,
  ValidationErrors,
  ValidatorFn,
  Validators,
  UntypedFormGroup
} from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { UsersService } from 'src/services/users.service';

export function passwordsMatchValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    if (password && confirmPassword && password !== confirmPassword) {
      return { passwordsDontMatch: true };
    } else {
      return null;
    }
  };
}
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  signUpForm = new UntypedFormGroup(
    {
      name: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required),
    },
    { validators: passwordsMatchValidator() }
  );

  constructor(
    private AuthenticationService: AuthenticationService,
    private router: Router,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {}

  get email() {
    return this.signUpForm.get('email');
  }

  get password() {
    return this.signUpForm.get('password');
  }

  get confirmPassword() {
    return this.signUpForm.get('confirmPassword');
  }

  get name() {
    return this.signUpForm.get('name');
  }

  submit() {
    if (!this.signUpForm.valid) {
      return;
    }

    const { name, email, password } = this.signUpForm.value;
    this.AuthenticationService
      .signUp(email, password)
      .pipe(
        switchMap(({ user: { uid } }) =>
          this.usersService.addUser({ uid, email, displayName: name })
        ),
        
        )
      
      .subscribe(() => {
        console.log('Navigating to /home');
        this.router.navigate(['/home']);

      });
  }
}
