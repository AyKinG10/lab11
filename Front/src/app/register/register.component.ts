import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  newUserForm: FormGroup;
  registrationSuccess = false;

  constructor(
    private userService: UserService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.newUserForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  createUser(): void {
    const userData = this.newUserForm.value;

    // Check if passwords match
    if (userData.password !== userData.confirmPassword) {
      console.error('Passwords do not match');
      return;
    }

    delete userData.confirmPassword; // Remove confirmPassword from the data sent to the server

    this.userService.createUser(userData).subscribe(
      (response) => {
        console.log('User Created:', response);
        this.registrationSuccess = true;

        if (response && response.token) {
          this.router.navigate(['/task-list']);
        }
      },
      (error) => {
        console.error('Error creating user:', error);
      }
    );
  }
}
