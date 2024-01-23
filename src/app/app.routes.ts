import { inject } from '@angular/core';
import { Routes } from '@angular/router';
import { ProfilePageComponent } from '@components/profile-page/profile-page.component';
import { RegistrationPageComponent } from '@components/registration-page/registration-page.component';
import { ProfileGuard } from '@services/profile-guard/profile-guard';

export const routes: Routes = [
  { path: 'register', component: RegistrationPageComponent},
  { path: 'profile', component: ProfilePageComponent, canActivate: [() => inject(ProfileGuard).canActivateProfilePage()], },
  // { path: 'profile', component: ProfilePageComponent, canActivate: [() => inject(ProfileGuard).canActivateProfilePage()], },
  { path: '**', redirectTo: 'register', pathMatch: 'full' },
];
