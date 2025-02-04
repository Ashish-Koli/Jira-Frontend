import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { Epic } from './epic/epic.component';
import { AddBoard, BoardResponse } from './dto/project';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getAllEpic(): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/epic/allEpic`).pipe(
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

  getAllBoardsByUserId(id: number): Observable<BoardResponse[]> {
    return this.http.get<any>(`http://localhost:8080/board/user/${id}`);
  }

  getBoardById(id: number): Observable<any> {
    return this.http.get<any>(`http://localhost:8080/board/${id}`);
  }

  createBoard(board: AddBoard): Observable<any> {
    return this.http.post<any>(`http://localhost:8080/board/create`, board);
  }

  updateBoard(board: AddBoard, id: number): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/board/update/${id}`,
      board
    );
  }

  deleteBoard(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/board/delete/${id}`);
  }
}
