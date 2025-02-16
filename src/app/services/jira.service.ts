import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class JiraService {
  constructor(private http: HttpClient) {}

  getAllUsersBySprintId(sprintId: number): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>(
      `http://localhost:8080/user/sprint/${sprintId}`
    );
  }
}
