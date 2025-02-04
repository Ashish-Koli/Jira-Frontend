import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  constructor(private http: HttpClient) {}

  getProjectNamesByUserId(id: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/project/projectNames/user/${id}`
    )
  }

  getUsers(): Observable<any> {
    return this.http.get('http://localhost:8080/user/allUser');
  }

  getAllProjectsByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/project/user/${id}`);
  }

  createProject(project: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/project/create`, project);
  }

  updateProject(project: any, id: number): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/project/update/${id}`,
      project
    );
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/project/delete/${id}`);
  }
}
