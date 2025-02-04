import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Epic } from './epic/epic.component';

@Injectable({
  providedIn: 'root',
})
export class EpicService {
  constructor(private http: HttpClient) {}

  getAllEpicByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/epic/user/${id}`).pipe(
      map((result: any) => {
        // console.log(result);
        return result?.map((obj: Epic) => {
          // console.log(obj);
          return {
            epicId: obj.epicId,
            epicName: obj.epicName,
            description: obj.description,
            project: obj.project,
          };
        });
      })
    );
  }
  // http://localhost:8080/project/projectNames/user/1

  getEpicById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/epic/${id}`);
  }

  createEpic(epic: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/epic/create`, epic);
  }

  updateEpic(epic: any, id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/epic/update/${id}`, epic);
  }

  deleteEpic(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/epic/delete/${id}`);
  }
}
