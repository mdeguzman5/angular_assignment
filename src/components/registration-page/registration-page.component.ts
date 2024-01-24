import { Component, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MatSnackBarModule, MatSnackBar } from '@angular/material/snack-bar';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { IUserRegistrationResponse } from '@models/user-profile.model';
import { allWhiteSpaceValidator, emailValidator } from '@validators/custom-validator';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-page',
  standalone: true,
  imports: [
    MatSnackBarModule,
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  public registrationForm: FormGroup;
  private emailPatter = ``

  constructor(
    public router: Router,
    private profileService: UserProfileService,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(65), allWhiteSpaceValidator()]),
      email: new FormControl('', [Validators.required, Validators.email, emailValidator()]),
      password: new FormControl('', [Validators.required, Validators.nullValidator, Validators.minLength(6), Validators.maxLength(30), allWhiteSpaceValidator()]),
      bio: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(100)]),
    });
  }

  public submitForm(): void {
    if (this.registrationForm.valid) {
      // send request
      this.profileService.registerUser().subscribe((response: IUserRegistrationResponse) => {
        if (response.success) {
          localStorage.setItem('registrationToken', 'true');
          this.router.navigate(['profile']);
          this.snackBar.open('Registration Successful!', 'dismiss', 
          {
            duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        } else {
          this.snackBar.open('Backend Error, Please try again', 'dismiss', 
          { duration: 5000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['fail-snackbar']
          });
        }
      });
    }
  }

  get passwordErrorMessage(): string {
    const passwordControl = this.registrationForm.get('password');

    return passwordControl?.hasError('required') ? 'Password is Required' :
      passwordControl?.hasError('minlength') ? `Password must be at least ${passwordControl?.errors?.['minlength'].requiredLength} characters` :
      passwordControl?.hasError('maxlength') ? `Password must be max of ${passwordControl?.errors?.['maxlength'].requiredLength} characters` :
      passwordControl?.hasError('allWhiteSpace') ? 'Password cannot be all white space' : '';
  }
}
