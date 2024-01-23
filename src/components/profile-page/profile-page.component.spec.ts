import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfilePageComponent } from './profile-page.component';
import { UserProfileService } from '@services/user-profile/user-profile.service';
import { mockUserProfile } from '@mocks/user-profile';
import { of } from 'rxjs';

describe('ProfilePageComponent', () => {
  let component: ProfilePageComponent;
  let fixture: ComponentFixture<ProfilePageComponent>;
  let userProfileService: UserProfileService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfilePageComponent],
      providers: [{ provide: UserProfileService, useValue: { getUserProfileDetails: () => {return of(mockUserProfile)} } }],
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfilePageComponent);
    component = fixture.componentInstance;
    userProfileService = TestBed.inject(UserProfileService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get profile data', () => {
    spyOn(userProfileService, 'getUserProfileDetails').and.returnValue(of(mockUserProfile));
    spyOn(localStorage, 'removeItem');

    component.getUserProfileDetails();

    expect(userProfileService.getUserProfileDetails).toHaveBeenCalled();
    expect(component.userProfileDetails).toEqual(mockUserProfile);
    expect(localStorage.removeItem).toHaveBeenCalledWith('registrationToken');
  });
});
