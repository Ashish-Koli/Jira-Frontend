import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddEpic, EpicResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  constructor(private http: HttpClient) {}

  getAllEpicByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/epic/user/${id}`).pipe(
      map((result: any) => {
        return result?.map((obj: EpicResponse) => {
          return {
            epicId: obj.epicId,
            epicName: obj.epicName,
            description: obj.description,
            projectId: obj.projectId,
            project: obj.project,
          };
        });
      })
    );
  }

  // getEpicById(id: number): Observable<any> {
  //   return this.http.get<any>(`http://localhost:8080/epic/${id}`);
  // }

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

  deleteEpic(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/epic/delete/${id}`);
  }
}
