import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddProject, Project, ProjectResponse } from '../dto/project';
import { User } from '../example-project/project-form/project-form.component';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectNamesByUserId(id: number): Observable<ProjectResponse[]> {
    return this.http.get<ProjectResponse[]>(
      `http://localhost:8080/project/projectNames/user/${id}`
    );
  }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>('http://localhost:8080/user/allUser');
  }

  getAllProjectsByUserId(id: number): Observable<Project[]> {
    return this.http.get<Project[]>(`http://localhost:8080/project/user/${id}`);
  }

  createProject(project: AddProject): Observable<Project> {
    return this.http.post<Project>(
      `http://localhost:8080/project/create`,
      project
    );
  }

  updateProject(project: AddProject, id: number): Observable<Project> {
    return this.http.put<Project>(
      `http://localhost:8080/project/update/${id}`,
      project
    );
  }

  deleteProject(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/project/delete/${id}`);
  }
}
