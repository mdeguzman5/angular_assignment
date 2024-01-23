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
import { ProfileGuard } from '@services/profile-guard/profile-guard';

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
    MatButtonModule
  ],
  templateUrl: './registration-page.component.html',
  styleUrl: './registration-page.component.scss'
})
export class RegistrationPageComponent {
  public registrationForm: FormGroup;

  constructor(
    public router: Router,
    private profileService: UserProfileService,
    private snackBar: MatSnackBar
  ) {
    this.registrationForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(65)]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(30)]),
      bio: new FormControl('', [Validators.required, Validators.nullValidator, Validators.maxLength(100)]),
    });
  }

  public submitForm(): void {
    if (this.registrationForm.valid) {
      // send request
      this.profileService.registerUser().subscribe((response: IUserRegistrationResponse) => {
        console.log(`response -> ${response}`);
        if (response.success) {
          localStorage.setItem('registrationToken', 'true');
          this.router.navigate(['profile']);
          this.snackBar.open('Registration Successful!', 'dismiss', 
          {
            duration: 100000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['success-snackbar']
          });
        } else {
          this.snackBar.open('Backend Error, Please try again', 'dismiss', 
          { duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
            panelClass: ['fail-snackbar']
          });
        }
      });
    }
  }
}
