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
      `http://localhost:8080/sprint/stories/${sprintId}`
    );
  }

  createStory(story: AddStory): Observable<StoryResponse> {
    return this.http.post<StoryResponse>(`http://localhost:8080/story`, story);
  }

  updateStoryStatus(
    storyStatus: UpdateStoryStatusDTO,
    storyId: number
  ): Observable<UpdateStoryStatusDTO> {
    return this.http.put<UpdateStoryStatusDTO>(
      `http://localhost:8080/story/storyStatus/${storyId}`,
      storyStatus
    );
  }

  deleteStory(storyId: number): Observable<void> {
    return this.http.delete<void>(`http://localhost:8080/story/${storyId}`);
  }

  updateStory(story: AddStory, storyId: number): Observable<StoryResponse> {
    return this.http.put<StoryResponse>(
      `http://localhost:8080/story/${storyId}`,
      story
    );
  }


  getAllStoryStatus(): Observable<StoryStatusResponse[]> {
    return this.http.get<StoryStatusResponse[]>(
      `http://localhost:8080/storyStatus/allStoryStatuses`
    );
  }

  getAllCommentByStoryId(storyId: number): Observable<CommentResponse[]> {
    return this.http.get<CommentResponse[]>(
      `http://localhost:8080/comment/allComments/${storyId}`
    );
  }

  getAllSubTaskByStoryId(storyId: number): Observable<SubTaskResponse[]> {
    return this.http.get<SubTaskResponse[]>(
      `http://localhost:8080/subTask/allSubTasks/${storyId}`
    );
  }

  addComment(comment: AddComment): Observable<AddComment> {
    return this.http.post<AddComment>(
      `http://localhost:8080/comment`,
      comment
    );
  }
  addSubTask(task: AddSubTask): Observable<AddSubTask> {
    return this.http.post<AddSubTask>(`http://localhost:8080/subTask`, task);
  }

  deleteComment(commentId: number): Observable<void> {
    return this.http.delete<void>(
      `http://localhost:8080/comment/${commentId}`
    );
  }

  getStoryDetailsById(id: number): Observable<StoryResponse> {
    return this.http.get<StoryResponse>(`http://localhost:8080/story/${id}`);
  }
}
