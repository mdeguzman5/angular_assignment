import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { IUserProfileDetails, IUserRegistrationResponse } from '@models/user-profile.model';
import { environment } from '@environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserProfileService {
  readonly REGISTRATION_END_URL = '/7f434df6-a4ac-4817-ab7c-dd39a564d01d';
  readonly GET_USER_PROFILE_END_URL = '/611a3036-4420-48a5-b8da-9b461853cdd2';

  constructor(private http: HttpClient) { }

  public getUserProfileDetails(): Observable<IUserProfileDetails> {
    return this.http.get<IUserProfileDetails>(`${environment.baseUrl}${this.GET_USER_PROFILE_END_URL}`);
  }

  public registerUser(): Observable<IUserRegistrationResponse> {
    return this.http.get<IUserRegistrationResponse>(`${environment.baseUrl}${this.REGISTRATION_END_URL}`);
  }

  public isRegistered(): boolean {
    const token = localStorage.getItem('registrationToken');
    return !token ? false : true;
  }
}
