import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { ProjectService } from 'src/app/project.service';
export interface User {
  userId: number;
  userName: string;
  email: string;
  role: string;
}
export class AddProjectDTO {
  projectName: string;
  projectDescription: string;
  userList: number[];

  constructor(
    projectName: string,
    projectDescription: string,
    userList: number[]
  ) {
    this.projectName = projectName;
    this.projectDescription = projectDescription;
    this.userList = userList;
  }
}
@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css'],
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup;
  editMode: boolean = false;
  currentIndex!: number;
  value: string = 'Add';
  currentId!: number;
  users: User[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    projectService
      .getUsers()
      .pipe(
        map((data: any) => {
          return data?.map((obj: User) => {
            return {
              userId: obj.userId,
              userName: obj.userName,
              userEmail: obj.email,
              userRole: obj.role,
            };
          });
        })
      )
      .subscribe((usersList: User[]) => {
        this.users = usersList;
      });
  }
  ngOnInit(): void {
    this.projectForm = this.fb.group({
      projectName: ['', [Validators.required]],
      projectDescription: ['', [Validators.required]],
      userList: [[]],
    });

    if (this.data !== null) {
      this.editMode = true;
      this.value = 'Edit';
      this.currentId = this.data.id;
      console.log(this.data.editProject.userList);
      this.projectForm.patchValue(this.data.editProject);
      
    }
  }
  save() {
    const newProject: AddProjectDTO = this.projectForm.value;
    console.log(newProject);
    if (this.editMode) {
      this.projectService
        .updateProject(newProject, this.currentId)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.projectService
        .createProject(newProject)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}
