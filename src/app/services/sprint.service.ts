import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddRelease, AddSprint, ReleaseNameResponse, SprintResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  constructor(private http: HttpClient) {}

  getAllSprintByUserId(id: number): Observable<SprintResponse[]> {
    return this.http.get<SprintResponse[]>(`http://localhost:8080/sprint/user/${id}`)
  }

  getSprintById(id:number): Observable<SprintResponse[]> {
    return this.http.get<SprintResponse[]>(`http://localhost:8080/sprint/${id}`)
  }

  createSprint(sprint: AddSprint): Observable<SprintResponse> {
    return this.http.post<SprintResponse>(
      `http://localhost:8080/sprint/create`,
      sprint
    );
  }

  updateSprint(sprint: AddSprint, id: number): Observable<SprintResponse> {
    return this.http.put<SprintResponse>(
      `http://localhost:8080/sprint/update/${id}`,
      sprint
    );
  }

  deleteSprint(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/sprint/delete/${id}`);
  }

  createRelease(release: AddRelease): Observable<ReleaseNameResponse> {
    return this.http.post<ReleaseNameResponse>(`http://localhost:8080/release/create`, release);
  }

  updateRelease(release: AddRelease): Observable<ReleaseNameResponse> {
    return this.http.put<ReleaseNameResponse>(`http://localhost:8080/release/update`, release);
  }
}
