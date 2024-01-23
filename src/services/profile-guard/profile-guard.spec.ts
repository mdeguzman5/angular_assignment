import { TestBed } from '@angular/core/testing';
import { ProfileGuard } from './profile-guard';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { UserProfileService } from '@services/user-profile/user-profile.service';

describe('ProfileGuardService', () => {
  let profileService: UserProfileService;
  let profileGuard: ProfileGuard;
  let router: Router;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers: [ProfileGuard, UserProfileService]
    });

    profileService = TestBed.inject(UserProfileService);
    profileGuard = TestBed.inject(ProfileGuard);
    router = TestBed.inject(Router);
  });

  it('should be created', () => {
    expect(profileService).toBeTruthy();
  });

  it('should return true if user successfully registered', () => {
    spyOn(profileService, 'isRegistered').and.returnValue(true);
    const canActivateProfilePage = profileGuard.canActivateProfilePage();
    expect(canActivateProfilePage).toBe(true);
    expect(profileService.isRegistered).toHaveBeenCalled();
  });

  it('should reroute to registration page if user has not yet registered', () => {
    spyOn(profileService, 'isRegistered').and.returnValue(false);
    spyOn(router, 'navigate');
    const canActivateProfilePage = profileGuard.canActivateProfilePage();
    expect(canActivateProfilePage).toBe(false);
    expect(profileService.isRegistered).toHaveBeenCalled();
    expect(router.navigate).toHaveBeenCalledWith(['register']);
  });
});
