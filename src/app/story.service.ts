import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AddStory, UpdateStoryStatusDTO } from './dto/project';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private http: HttpClient) {}

  getCategorizedStories(sprintId: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/sprint/${sprintId}/stories`
    );
  }

  createStory(story: AddStory): Observable<any[]> {
    return this.http.post<any[]>(`http://localhost:8080/story/create`, story);
  }

  updateStoryStatus(
    storyStatus: UpdateStoryStatusDTO,
    id: number
  ): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8080/story/update/storyStatus/${id}`,
      storyStatus
    );
  }

  deleteStory(id: number): Observable<any> {
    return this.http.delete<any>(`http://localhost:8080/story/delete/${id}`);
  }

  updateStory(story:AddStory,id: number): Observable<any> {
    return this.http.put<any>(`http://localhost:8080/story/update/${id}`, story);
  }
  getBoardsByUserId(id: number): Observable<any> {
    return this.http.get<any>(
      `http://localhost:8080/board/allBoards/user/${id}`
    );
  }
  getSprintByBoardId(id: number): Observable<any[]> {
    return this.http.get<any[]>(`http://localhost:8080/sprint/board/${id}`);
  }

  getAllStoryStatus(): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/storyStatus/allStoryStatus`
    );
  }

  getAllCommentByStoryId(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/comments/allComment/${id}`
    );
  }

  getAllSubTaskByStoryId(id: number): Observable<any[]> {
    return this.http.get<any[]>(
      `http://localhost:8080/subTask/allSubTask/${id}`
    );
  }

  addComment(comment: any): Observable<any[]> {
    return this.http.post<any[]>(
      `http://localhost:8080/comments/create`,
      comment
    );
  }
  addSubTask(task: any): Observable<any[]> {
    return this.http.post<any[]>(
      `http://localhost:8080/subTask/create`,
      task
    );
  }

  deleteComment(id: number): Observable<any> {
    return this.http.delete<any[]>(
      `http://localhost:8080/comments/delete/${id}`
    );
  }

  getStoryDetailsById(id: number): Observable<any> {
    return this.http.get<any[]>(`http://localhost:8080/story/${id}`);
  }
}
