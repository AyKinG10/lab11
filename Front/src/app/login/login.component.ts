import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  loginUser(): void {
    const credentials = this.loginForm.value;

    this.userService.loginUser(credentials).subscribe(
      (response) => {
        console.log('Login Successful:', response);

        if (response && response.token) {
          this.router.navigate(['/task-list']);
        } else {
          this.loginError = true;
        }
      },
      (error) => {
        console.error('Login Failed:', error);
        this.loginError = true;
      }
    );
  }
}
