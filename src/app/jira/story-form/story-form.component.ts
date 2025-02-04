import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth.service';
import { AddStory } from 'src/app/dto/project';
import { ProjectService } from 'src/app/project.service';
import { SprintService } from 'src/app/sprint.service';
import { StoryService } from 'src/app/story.service';

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
  projects: any[] = [];
  boards: any[] = [];
  sprints: any[] = [];
  storyStatus: any[] = [];
  epics: any[] = [];
  userId!:number;
  constructor(
    private fb: FormBuilder,
    private storyService: StoryService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<StoryFormComponent>,
    private auth:AuthService,
    @Inject(MAT_DIALOG_DATA) public data: any
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
      project: [, [Validators.required]],
      board: [, [Validators.required]],
      sprint: [, [Validators.required]],
      epic: [, [Validators.required]],
    });

    if (this.data !== null) {
      this.editMode = true;
      this.value = 'Edit';
      this.currentId = this.data.id;
      console.log(this.data);
      this.storyForm.patchValue(this.data.editStory);
    }

    this.getStoryStatus();
    this.getProjects();

    this.storyForm.get('project')?.valueChanges.subscribe((projectId) => {
      this.onProjectChange(projectId);
    });

    this.storyForm.get('board')?.valueChanges.subscribe((boardId) => {
      this.onBoardChange(boardId);
    });
  }
  getStoryStatus() {
    this.storyService.getAllStoryStatus().subscribe((data) => {
      this.storyStatus = data;
      console.log(data);
    });
  }
  getProjects() {
    this.projectService.getAllProjectsByUserId(this.userId).subscribe({
      next: (data) => {
        this.projects = data;
      },
      error: (err) => {
        console.error('Failed to load projects:', err);
      },
    });
  }
  onProjectChange(projectId: number) {
    const selectedProject = this.projects.find(
      (project) => project.projectId === projectId
    );

    if (selectedProject) {
      this.boards = selectedProject.boardList || [];
      this.epics = selectedProject.epicList || [];
      this.storyForm.get('board')?.reset();
      this.storyForm.get('sprint')?.reset();
      this.storyForm.get('epic')?.reset();

      this.sprints = []; 
    } else {
      this.boards = [];
      this.epics = [];
      this.sprints = [];
    }
  }

  onBoardChange(boardId: number) {
    const selectedBoard = this.boards.find(
      (board) => board.boardId === boardId
    );

    if (selectedBoard) {
      this.sprints = selectedBoard.sprintList || [];
      this.storyForm.get('sprint')?.reset(); 
    } else {
      this.sprints = [];
    }
  }


  save() {
    const newStory: AddStory = this.storyForm.value;
    console.log(newStory);
    if (this.editMode) {
      this.storyService
        .updateStory(newStory, this.currentId)
        .subscribe(() => this.dialogRef.close(true));
    } else {
    this.storyService
      .createStory(newStory)
      .subscribe(() => this.dialogRef.close(true));
    }
  }
}
