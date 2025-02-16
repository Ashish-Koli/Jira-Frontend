import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import {
  AddUser,
  Login,
  RoleResponse,
  TokenResponse,
  UserResponse,
} from '../dto/project';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {
    const savedRole = localStorage.getItem('role');
    const savedUserId = localStorage.getItem('userId');

    if (savedRole) {
      this.roleSubject.next(savedRole);
    }

    if (savedUserId) {
      this.userIdSubject.next(Number(savedUserId));
    }
  }

  private roleSubject = new BehaviorSubject<string>('');
  private userIdSubject = new BehaviorSubject<number>(0);

  role$ = this.roleSubject.asObservable();
  userId$ = this.userIdSubject.asObservable();

  getRoles(): Observable<RoleResponse[]> {
    return this.http.get<RoleResponse[]>('http://localhost:8080/role/allRoles');
  }

  login(loginDTO: Login): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(
      'http://localhost:8080/user/login',
      loginDTO
    );
  }

  register(newUser: AddUser): Observable<UserResponse> {
    return this.http.post<UserResponse>(
      'http://localhost:8080/user/create',
      newUser
    );
  }

  getUserById(id: number): Observable<UserResponse> {
    return this.http.get<UserResponse>(`http://localhost:8080/user/${id}`);
  }

  setToken(token: string, role: string, userId: number) {
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    localStorage.setItem('userId', userId.toString());
    this.roleSubject.next(role);
    this.userIdSubject.next(userId);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(): string {
    return this.roleSubject.value;
  }

  getUserId(): number {
    return this.userIdSubject.value;
  }

  isAuthenticated(): boolean {
    return this.getToken() != null;
  }

  isAuthorized(id: number): boolean {
    if (!this.isAuthenticated()) {
      return false;
    }

    if (this.getRole() == 'Admin' || this.getRole() == 'Manager') return true;

    if (this.getRole() == 'Developer') {
      if (this.getUserId() == id) {
        return true;
      }
    }

    return false;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');

    this.roleSubject.next('');
    this.userIdSubject.next(0);
  }
}
