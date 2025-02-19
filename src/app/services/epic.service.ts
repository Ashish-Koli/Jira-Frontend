import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddEpic, EpicResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  constructor(private http: HttpClient) {}

  getAllEpicByUserId(userId: number): Observable<EpicResponse[]> {
    return this.http.get<EpicResponse[]>(`http://localhost:8080/epic/user/${userId}`)
  
  }


  createEpic(epic: AddEpic): Observable<EpicResponse> {
    return this.http.post<EpicResponse>(
      `http://localhost:8080/epic`,
      epic
    );
  }

  updateEpic(epic: AddEpic, epicId: number): Observable<EpicResponse> {
    return this.http.put<EpicResponse>(
      `http://localhost:8080/epic/${epicId}`,
      epic
    );
  }

  deleteEpic(epicId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/epic/${epicId}`);
  }
}
