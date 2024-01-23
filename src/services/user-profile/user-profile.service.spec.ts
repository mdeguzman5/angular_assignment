import { TestBed } from '@angular/core/testing';
import { UserProfileService } from './user-profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { mockUserRegistrationSuccess } from '@mocks/user-registration';
import { environment } from '@environments/environment';
import { mockUserProfile } from '@mocks/user-profile';

describe('UserProfileService', () => {
  let profileService: UserProfileService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserProfileService],
    });

    profileService = TestBed.inject(UserProfileService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(profileService).toBeTruthy();
  });

  it('should return true if user is registered', () => {
    localStorage.setItem('registrationToken', 'dummyToken');
    const isAuthenticated = profileService.isRegistered();
    expect(isAuthenticated).toBe(true);
  });

  it('should return false if user is not yet registered', () => {
    localStorage.removeItem('registrationToken');
    const isAuthenticated = profileService.isRegistered();
    expect(isAuthenticated).toBe(false);
  });

  it('should send request for user profile details', () => {
    profileService.getUserProfileDetails().subscribe((userProfile) => {
      expect(userProfile).toEqual(mockUserProfile);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}${profileService.GET_USER_PROFILE_END_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserProfile);
  });

  it('should send a request for registration', () => {
    profileService.registerUser().subscribe((response) => {
      expect(response).toEqual(mockUserRegistrationSuccess);
    });

    const req = httpTestingController.expectOne(`${environment.baseUrl}${profileService.REGISTRATION_END_URL}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUserRegistrationSuccess);
  });
});
