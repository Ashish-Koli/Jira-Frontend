import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {
  ProjectBoardResponse,
  ProjectBoardSprintsResponse,
  ProjectResponse,
} from '../dto/project';

@Injectable({
  providedIn: 'root',
})
export class SharedService {
  private projectDetails!: {
    project: ProjectResponse;
    board: ProjectBoardResponse;
    sprint: ProjectBoardSprintsResponse;
  };

  setProjectDetails(data: {
    project: ProjectResponse;
    board: ProjectBoardResponse;
    sprint: ProjectBoardSprintsResponse;
  }) {
    this.projectDetails = data;
  }

  getProjectDetails() {
    return this.projectDetails;
  }
}
