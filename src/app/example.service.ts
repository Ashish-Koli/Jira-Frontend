import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExampleService {
  constructor(private http: HttpClient) {}

  getBoards(): Observable<any[]> {
    return this.http.get<any[]>('http://localhost:8080/board/project/2');
  }

  getSprints(boardId: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/sprint/board/${boardId}`
    );
  }
}
