import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationPageComponent } from './registration-page.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatSnackBar } from '@angular/material/snack-bar';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { of } from 'rxjs';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { mockUserRegistrationFail, mockUserRegistrationSuccess } from '@mocks/user-registration';

describe('RegistrationPageComponent', () => {
  let component: RegistrationPageComponent;
  let fixture: ComponentFixture<RegistrationPageComponent>;
  let profileService: UserProfileService;
  let snackBar: MatSnackBar;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RegistrationPageComponent, 
        NoopAnimationsModule, 
        RouterTestingModule, 
        ReactiveFormsModule, 
        MatCardModule, 
        MatFormFieldModule
      ],
      providers: [
        { provide: UserProfileService, useValue: { registerUser: () => {return of({success: true})} } },
        { provide: MatSnackBar, useValue: { open: () => {} } },
      ],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RegistrationPageComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(UserProfileService);
    snackBar = TestBed.inject(MatSnackBar);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to profile page upon successful registration', () => {
    spyOn(profileService, 'registerUser').and.returnValue(of(mockUserRegistrationSuccess));
    spyOn(component.router, 'navigate');

    component.registrationForm.setValue({
      email: 'johndoe@abc.com',
      name: 'John Doe',
      password: 'abcd12345678',
      bio: 'I am a front end developer',
    });

    component.submitForm();

    expect(profileService.registerUser).toHaveBeenCalled();
    expect(component.router.navigate).toHaveBeenCalledWith(['profile']);
  });

  it('should not navigate on profile page due to registration error response', () => {
    spyOn(profileService, 'registerUser').and.returnValue(of(mockUserRegistrationFail));
    spyOn(component.router, 'navigate');

    component.registrationForm.setValue({
      email: 'johndoe@abc.com',
      name: 'John Doe',
      password: 'abcd12345678',
      bio: 'I am a front end developer',
    });

    component.submitForm();

    expect(profileService.registerUser).toHaveBeenCalled();
    expect(component.router.navigate).not.toHaveBeenCalled();
  });
});
