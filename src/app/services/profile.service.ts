import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ChangePassword, UpdateUser, UserResponse } from '../dto/project';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(private http: HttpClient) {}

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`http://localhost:8080/user/${id}`);
  }

  updateProfile(id: number, user: UpdateUser): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `http://localhost:8080/user/updateProfile/${id}`,
      user
    );
  }

  
  changePassword(id: number, passwordChange:ChangePassword): Observable<UserResponse> {
    return this.http.put<UserResponse>(
      `http://localhost:8080/user/changePassword/${id}`,
      passwordChange
    );
  }
}
