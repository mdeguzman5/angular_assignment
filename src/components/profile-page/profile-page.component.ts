import { CommonModule } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { IUserProfileDetails } from '@models/user-profile.model';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-profile-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './profile-page.component.html',
  styleUrl: './profile-page.component.scss'
})
export class ProfilePageComponent implements OnDestroy {
  public userProfileDetails!: IUserProfileDetails
  private subscriptions: Subscription[] = [];

  constructor(private userProfileService: UserProfileService) {
    this.getUserProfileDetails();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }

  public getUserProfileDetails(): void {
    this.subscriptions.push(this.userProfileService.getUserProfileDetails().subscribe((userProfile: IUserProfileDetails) => {
      this.userProfileDetails = userProfile;
      // remove storage upon loading
      localStorage.removeItem('registrationToken');
    }));
  }
}
