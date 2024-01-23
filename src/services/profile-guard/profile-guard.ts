import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserProfileService } from '@services/user-profile/user-profile.service';

@Injectable({
  providedIn: 'root'
})
export class ProfileGuard {
  constructor(
    private profileService: UserProfileService,
    private router: Router
  ) { }

  canActivateProfilePage(): boolean {
    if (this.profileService.isRegistered()) {
      return true;
    }

    // reroute to registration form otherwise
    this.router.navigate(['register']);
    return false;
  }
}
