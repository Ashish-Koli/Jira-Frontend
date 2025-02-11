import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../services/shared.service';
import { ActivatedRoute } from '@angular/router';
import { JiraService } from '../services/jira.service';
import { StoryService } from '../services/story.service';
import { AddStory, UpdateStoryStatusDTO } from '../dto/project';
import { MatDialog } from '@angular/material/dialog';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { AuthService } from '../services/auth.service';
import { SprintService } from '../services/sprint.service';

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.css'],
})
export class JiraComponent implements OnInit {
  id: any;
  project!:string | null;
  board!:string | null;
  sprint!:string | null;
  userId!: number;
  sprintDetails!: any;
  startDate:any;


  constructor(
    private route: ActivatedRoute,
    private storyService: StoryService,
    private dialog: MatDialog,
    private auth: AuthService,
    private sprintService:SprintService
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });

  }



  ngOnInit() {
    this.route.paramMap.subscribe((data) => {
      this.id = data.get('id');
      this.project = data.get('project');
      this.board = data.get('board');
      this.sprint = data.get('sprint');
      console.log('i will fetch projects of id:', this.id);
      this.sprintService.getSprintById(+this.id).subscribe((data)=>{
        this.sprintDetails = data;
        this.startDate = this.sprintDetails.startDate;
        console.log(this.sprintDetails);
      })
    });
    
  }
  stories: any = {
    ToDo: [],
    InProgress: [],
    Done: [],
    Blocked: [],
  };


  

  fetchStories(id: string | null): void {
    this.storyService.getCategorizedStories(+this.id).subscribe({
      next: (data) => {
        this.stories = data;
        console.log(data);
      },
      error: (error) => {
        console.error('Error fetching stories', error);
      },
    });
  }

  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
      const task = event.container.data[event.currentIndex];
      console.log(task);
      const newStatus: UpdateStoryStatusDTO = {
        storyStatusId: this.getStatus(event.container.id),
      };

      this.storyService.updateStoryStatus(newStatus, task.storyId).subscribe();
    }
  }

  getStatus(containerId: string): number {
    if (containerId === 'todo') return 1;
    if (containerId === 'done') return 2;
    if (containerId === 'inprogress') return 3;
    return 4;
  }

  story(id: number) {
    console.log('HEYYYYYYYYY');
    const dialogRef = this.dialog.open(StoryDetailsComponent, {
      data: { id: id },
    });
    // dialogRef.afterClosed().subscribe(() => this.fetchStories(this.id));
  }

  open() {
    const dialogRef = this.dialog.open(StoryFormComponent);
    dialogRef.afterClosed().subscribe(() => this.fetchStories(this.id));
  }

  edit(story: any, id: number) {
    console.log(story);
    const editStory = {
      storyName: story.storyName,
      description: story.description,
      storyStatus: story.storyStatus.id,
    };
    const dialogRef = this.dialog.open(StoryFormComponent, {
      data: { editStory: editStory, id: id },
    });
    dialogRef.afterClosed().subscribe(() => this.fetchStories(this.id));
    console.log(story);
  }

  delete(id: number) {
    this.storyService.deleteStory(id).subscribe(() => {
      this.fetchStories(this.id);
    });
  }

  isAuthorized(id:number):boolean{
    return this.auth.isAuthorized(id);
  }
}
