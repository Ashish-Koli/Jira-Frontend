import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { map } from 'rxjs';
import { AddProject, UserResponse } from 'src/app/dto/project';
import { ProjectService } from 'src/app/services/project.service';

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
  users: UserResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<ProjectFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data:  {editProject: AddProject, id: number }
  ) {
    projectService
      .getUsers().subscribe((data)=>{
        this.users = data;
      })
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
      this.projectForm.patchValue(this.data.editProject);
    }
  }
  save() {
    const newProject: AddProject = this.projectForm.value;
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
