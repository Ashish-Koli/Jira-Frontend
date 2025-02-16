import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  AddComment,
  AddStory,
  AddSubTask,
  BoardResponse,
  CommentResponse,
  SprintResponse,
  StoryCategories,
  StoryResponse,
  StoryStatusResponse,
  SubTaskResponse,
  UpdateStoryStatusDTO,
} from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  constructor(private http: HttpClient) {}

  getCategorizedStories(sprintId: number): Observable<StoryCategories> {
    return this.http.get<StoryCategories>(
      `http://localhost:8080/sprint/${sprintId}/stories`
    );
  }

  createStory(story: AddStory): Observable<AddStory> {
    return this.http.post<AddStory>(`http://localhost:8080/story/create`, story);
  }

  updateStoryStatus(
    storyStatus: UpdateStoryStatusDTO,
    id: number
  ): Observable<UpdateStoryStatusDTO> {
    return this.http.put<UpdateStoryStatusDTO>(
      `http://localhost:8080/story/update/storyStatus/${id}`,
      storyStatus
    );
  }

  deleteStory(id: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/story/delete/${id}`);
  }

  updateStory(story: AddStory, id: number): Observable<AddStory> {
    return this.http.put<AddStory>(
      `http://localhost:8080/story/update/${id}`,
      story
    );
  }


  getAllStoryStatus(): Observable<StoryStatusResponse[]> {
    return this.http.get<StoryStatusResponse[]>(
      `http://localhost:8080/storyStatus/allStoryStatus`
    );
  }

  getAllCommentByStoryId(id: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(
      `http://localhost:8080/comments/allComment/${id}`
    );
  }

  getAllSubTaskByStoryId(id: number): Observable<SubTaskResponse[]> {
    return this.http.get<SubTaskResponse[]>(
      `http://localhost:8080/subTask/allSubTask/${id}`
    );
  }

  addComment(comment: AddComment): Observable<AddComment> {
    return this.http.post<AddComment>(
      `http://localhost:8080/comments/create`,
      comment
    );
  }
  addSubTask(task: AddSubTask): Observable<AddSubTask> {
    return this.http.post<AddSubTask>(`http://localhost:8080/subTask/create`, task);
  }

  deleteComment(id: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/comments/delete/${id}`
    );
  }

  getStoryDetailsById(id: number): Observable<StoryResponse> {
    return this.http.get<StoryResponse>(`http://localhost:8080/story/${id}`);
  }
}
