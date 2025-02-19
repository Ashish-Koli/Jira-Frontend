import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { AddBoard, BoardResponse, EpicResponse } from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class BoardService {
  constructor(private http: HttpClient) {}

  getAllBoardsByUserId(userId: number): Observable<BoardResponse[]> {
    return this.http.get<BoardResponse[]>(`http://localhost:8080/board/user/${userId}`);
  }

  createBoard(board: AddBoard): Observable<BoardResponse> {
    return this.http.post<BoardResponse>(
      `http://localhost:8080/board`,
      board
    );
  }

  updateBoard(board: AddBoard, boardId: number): Observable<BoardResponse> {
    return this.http.put<BoardResponse>(
      `http://localhost:8080/board/${boardId}`,
      board
    );
  }

  deleteBoard(boardId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/board/${boardId}`);
  }
}
