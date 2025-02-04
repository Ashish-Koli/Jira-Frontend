import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Sprint } from './sprint/sprint.component';

@Injectable({
  providedIn: 'root',
})
export class SprintService {
  constructor(private http: HttpClient) {}

  getBoardsByProjectId(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/board/project/${id}`).pipe(
      map((result: any) => {
        return result?.map((obj: any) => {
          return {
            boardId: obj.boardId,
            boardName: obj.boardName,
            sprintList: obj.sprintList,
          };
        });
      })
    );
  }


  // -------------------------------------------------------------------------------------------------------------------------------------------
  getAllSprintByUserId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/sprint/user/${id}`).pipe(
      map((result: any) => {
        // console.log(result);
        return result?.map((obj: Sprint) => {
          // console.log(obj);
          return {
            sprintId: obj.sprintId,
            sprintNo: obj.sprintNo,
            sprintName: obj.sprintName,
            sprintPoint: obj.sprintPoint,
            startDate: obj.startDate,
            endDate: obj.endDate,
            board: obj.board,
          };
        });
      })
    );
  }



  createSprint(sprint: any): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/sprint/create`, sprint);
  }

  updateSprint(sprint: any, id: number): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/sprint/update/${id}`,
      sprint
    );
  }

  deleteSprint(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/sprint/delete/${id}`);
  }
}
