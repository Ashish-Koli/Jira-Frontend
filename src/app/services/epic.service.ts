import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddEpic, EpicResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  constructor(private http: HttpClient) {}

  getAllEpicByUserId(id: number): Observable<EpicResponse[]> {
    return this.http.get<EpicResponse[]>(`http://localhost:8080/epic/user/${id}`)
  
  }


  createEpic(epic: AddEpic): Observable<EpicResponse> {
    return this.http.post<EpicResponse>(
      `http://localhost:8080/epic/create`,
      epic
    );
  }

  updateEpic(epic: AddEpic, id: number): Observable<EpicResponse> {
    return this.http.put<EpicResponse>(
      `http://localhost:8080/epic/update/${id}`,
      epic
    );
  }

  deleteEpic(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/epic/delete/${id}`);
  }
}
