import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { AddStory, BoardResponse, Email, ProjectBoardResponse, ProjectBoardSprintsResponse, ProjectEpicsResponse, ProjectResponse, SprintResponse, StoryStatusResponse, UserResponse } from 'src/app/dto/project';
import { ProjectService } from 'src/app/services/project.service';
import { SprintService } from 'src/app/services/sprint.service';
import { StoryService } from 'src/app/services/story.service';
import { SharedService } from 'src/app/services/shared.service';
import { JiraService } from 'src/app/services/jira.service';
import { EmailService } from 'src/app/services/email.service';

@Component({
  selector: 'app-story-form',
  templateUrl: './story-form.component.html',
  styleUrls: ['./story-form.component.css'],
})
export class StoryFormComponent implements OnInit {
  storyForm!: FormGroup;
  editMode: boolean = false;
  currentIndex!: number;
  value: string = 'Add';
  currentId!: number;

  storyStatus: StoryStatusResponse[] = [];
  epics: ProjectEpicsResponse[] = [];
  projectId!:number;
  board!:number;
  sprint!:number;
  userId!:number; 
  users!:UserResponse[];

  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private jiraService:JiraService,
    private sharedService: SharedService,
    private emailService:EmailService,
    public dialogRef: MatDialogRef<StoryFormComponent>,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data:{editStory:{
      storyName: string,
      description: string,
      storyStatus: number,
      project:number, 
      board:number, 
      sprint:number,
      assignedTo:number
    }, id:number,}
  ) {

    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit(): void {
    this.storyForm = this.fb.group({
      storyName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      storyStatus: [, [Validators.required]],
      epic: [, [Validators.required]],
      assignedTo:[]
    });

    if (this.data !== null) {
      this.editMode = true;
      this.value = 'Edit';
      this.currentId = this.data.id;
      this.storyForm.patchValue(this.data.editStory);
      
    }

    this.getStoryStatus();
    this.epics = this.sharedService.getProjectDetails().project.epicList;
    this.board = this.sharedService.getProjectDetails().board.boardId;
    this.sprint = this.sharedService.getProjectDetails().sprint.sprintId;
    this.fetchUsers(this.sprint)
  }
  getStoryStatus() {
    this.storyService.getAllStoryStatus().subscribe((data) => {
      this.storyStatus = data;
    });
  }

  fetchUsers(sprintId:number){
    this.jiraService.getAllUsersBySprintId(sprintId).subscribe((data)=>{
      this.users = data;
    })
  }

  save() {
    const newStory: AddStory = this.storyForm.value;
    newStory.board = this.board;
    newStory.sprint = this.sprint;
    if (this.editMode) {
      this.storyService
        .updateStory(newStory, this.currentId)
        .subscribe((data) => {
          this.dialogRef.close(true)
          const email:Email = {
            to:data.assignedTo.email,
            subject:"A Story Has Been Modified",
            body:data.storyName
        }
        this.emailService.sendEmail(email).subscribe();
        });
    } else {
    this.storyService
      .createStory(newStory)
      .subscribe((data) => {
        this.dialogRef.close(true)
        const email:Email = {
            to:data.assignedTo.email,
            subject:"New Story Assigned To You",
            body:data.storyName
        }
        this.emailService.sendEmail(email).subscribe(); 
      });
    }

  }
}
