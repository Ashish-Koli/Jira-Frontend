import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router, Scroll } from '@angular/router';
import { JiraService } from '../services/jira.service';
import { StoryService } from '../services/story.service';
import {
  SprintResponse,
  StoryCategories,
  StoryResponse,
  UpdateStoryStatusDTO,
  UserResponse,
} from '../dto/project';
import { MatDialog } from '@angular/material/dialog';
import { StoryFormComponent } from './story-form/story-form.component';
import { StoryDetailsComponent } from './story-details/story-details.component';
import { AuthService } from '../services/auth.service';
import { SprintService } from '../services/sprint.service';
import { ScrollDirection } from '@angular/material/tabs';

@Component({
  selector: 'app-jira',
  templateUrl: './jira.component.html',
  styleUrls: ['./jira.component.css'],
})
export class JiraComponent implements OnInit {
  id!: string | null;
  project!: string | null;
  board!: string | null;
  sprint!: string | null;
  userId!: number;
  stories!: StoryCategories;
  stories1!: StoryCategories;
  sprintDetails!: SprintResponse;
  value: number = 0;
  daysLeft: number = 0;
  @ViewChild('scrollContainer', { static: false }) scrollContainer!: ElementRef;
  users: UserResponse[] = [];
  selectedUser: number = 0;

  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -150,
      behavior: 'smooth',
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 150,
      behavior: 'smooth',
    });
  }
  private scrollInterval: any;
  startScroll(direction: 'left' | 'right') {
    const scrollAmount = direction === 'left' ? -150 : 150;
    this.scrollInterval = setInterval(() => {
      this.scrollContainer.nativeElement.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }, 150);
  }

  stopScroll() {
    clearInterval(this.scrollInterval);
  }
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private storyService: StoryService,
    private dialog: MatDialog,
    private auth: AuthService,
    private sprintService: SprintService,
    private jiraService: JiraService
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
      this.fetchStories(this.id);
      this.fetchSprintDetails(this.id);
      this.fetchUsersBySprintId(this.id);
    });
  }

  userFilter(id: number) {
    this.selectedUser = id;
    if (id === 0) {
      this.stories1 = { ...this.stories };
    } else {
      this.stories1 = {
        ToDo: this.stories.ToDo.filter((story) => story.assignedTo.userId === id),
        InProgress: this.stories.InProgress.filter(
          (story) => story.assignedTo.userId === id
        ),
        Done: this.stories.Done.filter((story) => story.assignedTo.userId === id),
        Blocked: this.stories.Blocked.filter(
          (story) => story.assignedTo.userId === id
        ),
      };
    }
  }

  fetchUsersBySprintId(id: string | null) {
    if (id) {
      this.jiraService.getAllUsersBySprintId(+id).subscribe((data) => {
        this.users = data;
      });
    }
  }

  fetchSprintDetails(id: string | null) {
    if (id) {
      this.sprintService.getSprintDetailsById(+id).subscribe((data) => {
        this.sprintDetails = data;
        this.calculateProgress(
          this.sprintDetails.startDate,
          this.sprintDetails.endDate
        );
      });
    }
  }

  fetchStories(id: string | null) {
    if (id) {
      this.storyService.getCategorizedStories(+id).subscribe({
        next: (data) => {
          this.stories = data;
          this.userFilter(this.selectedUser);
        },
        error: (error) => {
          console.error('Error fetching stories', error);
        },
      });
    }
  }

  calculateProgress(startDate: Date, endDate: Date) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const today = new Date();
    if (today < start) {
      this.value = 0;
      this.daysLeft = Math.ceil(
        (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return;
    }
    if (today > end) {
      this.value = 100;
      this.daysLeft = 0;
      return;
    }

    const totalDays = (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
    const passedDays = (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
  

    const progress = Math.round((passedDays / totalDays) * 100);
    const daysLeft = Math.ceil(
      (end.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
    );

    this.value = progress;
    this.daysLeft = daysLeft;

  }

  drop(event: CdkDragDrop<StoryResponse[]>) {
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
      const newStatus: UpdateStoryStatusDTO = {
        storyStatusId: this.getStatus(event.container.id),
      };

      this.storyService.updateStoryStatus(newStatus, task.storyId).subscribe(()=>{
        this.fetchStories(this.id);
      });
    }
  }

  getStatus(containerId: string): number {
    if (containerId === 'todo') return 1;
    if (containerId === 'done') return 2;
    if (containerId === 'inprogress') return 3;
    return 4; // change this to 4
  }

  story(id: number) {
    const dialogRef = this.dialog.open(StoryDetailsComponent, {
      data: { id: id },
    });
  }

  open() {
    const dialogRef = this.dialog.open(StoryFormComponent);
    dialogRef.afterClosed().subscribe(() => this.fetchStories(this.id));
  }

  edit(story: StoryResponse, id: number) {
    console.log(story);
    const editStory = {
      storyName: story.storyName,
      description: story.description,
      storyStatus: story.storyStatus.id,
      epic: story.epic.epicId,
      assignedTo: story.assignedTo.userId
    };
    const dialogRef = this.dialog.open(StoryFormComponent, {
      data: { editStory: editStory, id: id },
    });
    dialogRef.afterClosed().subscribe(() => this.fetchStories(this.id));
  }

  delete(id: number) {
    this.storyService.deleteStory(id).subscribe(() => {
      this.fetchStories(this.id);
    });
  }

  isAuthorized(userId: number, assigneId:number): boolean {
    return this.auth.isAuthorized(userId, assigneId);
  }
}
