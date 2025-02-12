import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddProject, ProjectNamesResponse, ProjectResponse, UserResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectNamesByUserId(id: number): Observable<ProjectNamesResponse[]> {
    return this.http.get<ProjectNamesResponse[]>(
      `http://localhost:8080/project/projectNames/user/${id}`
    );
  }

  getUsers(): Observable<UserResponse[]> {
    return this.http.get<UserResponse[]>('http://localhost:8080/user/allUser');
  }

  getAllProjectsByUserId(id: number): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(`http://localhost:8080/project/user/${id}`);
  }

  createProject(project: AddProject): Observable<ProjectResponse> {
    return this.http.post<ProjectResponse>(
      `http://localhost:8080/project/create`,
      project
    );
  }

  updateProject(project: AddProject, id: number): Observable<ProjectResponse> {
    return this.http.put<ProjectResponse>(
      `http://localhost:8080/project/update/${id}`,
      project
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/project/delete/${id}`);
  }
}
