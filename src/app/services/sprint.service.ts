import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddRelease, AddSprint, ReleaseNameResponse, SprintResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  constructor(private http: HttpClient) {}

  getAllSprintByUserId(userId: number): Observable<SprintResponse[]> {
    return this.http.get<SprintResponse[]>(`http://localhost:8080/sprint/user/${userId}`)
  }

  // getSprintById(sprintId:number): Observable<SprintResponse> {
  //   return this.http.get<SprintResponse>(`http://localhost:8080/sprint/${sprintId}`)
  // }

  getSprintDetailsById(sprintId:number): Observable<SprintResponse> {
    return this.http.get<SprintResponse>(`http://localhost:8080/sprint/${sprintId}`)
  }

  createSprint(sprint: AddSprint): Observable<SprintResponse> {
    return this.http.post<SprintResponse>(
      `http://localhost:8080/sprint`,
      sprint
    );
  }

  updateSprint(sprint: AddSprint, sprintId: number): Observable<SprintResponse> {
    return this.http.put<SprintResponse>(
      `http://localhost:8080/sprint/${sprintId}`,
      sprint
    );
  }

  deleteSprint(sprintId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/sprint/${sprintId}`);
  }

  createRelease(release: AddRelease): Observable<ReleaseNameResponse> {
    return this.http.post<ReleaseNameResponse>(`http://localhost:8080/release`, release);
  }

  updateRelease(release: AddRelease): Observable<ReleaseNameResponse> {
    return this.http.put<ReleaseNameResponse>(`http://localhost:8080/release`, release);
  }
}
