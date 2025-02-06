import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardFromComponent } from '../../board/board-from/board-from.component';
import { EpicService } from 'src/app/epic.service';
import { ProjectService } from 'src/app/project.service';
import { map } from 'rxjs';
import { AddEpic, ProjectResponse } from 'src/app/dto/project';
import { AuthService } from 'src/app/auth.service';

@Component({
  selector: 'app-epic-form',
  templateUrl: './epic-form.component.html',
  styleUrls: ['./epic-form.component.css'],
})
export class EpicFormComponent implements OnInit {
  editMode: boolean = false;
  currentIndex!: number;
  value: string = 'Add';
  userId!: number;
  projects: ProjectResponse[] = [];

  epicForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private epicService: EpicService,
    private projectService: ProjectService,
    private auth:AuthService,
    public dialogRef: MatDialogRef<BoardFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editEpic: AddEpic, id: number }
  ) {

    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });

    projectService
      .getProjectNamesByUserId(this.userId)
      .subscribe((projectNameList: ProjectResponse[]) => {
        this.projects = projectNameList;
      });
  }

  ngOnInit(): void {
    this.epicForm = this.fb.group({
      epicName: ['', [Validators.required]],
      description: ['', [Validators.required]],
      project: ['', [Validators.required]],
    });

    if (this.data !== null) {
      this.editMode = true;
      this.currentIndex = this.data.id;
      this.value = 'Edit';
      this.epicForm.patchValue(this.data.editEpic);
    }
  }

  save() {
    console.log(this.epicForm.value);
    const epic: AddEpic = this.epicForm.value;
    if (this.editMode) {
      this.epicService
        .updateEpic(epic, this.currentIndex)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.epicService
        .createEpic(epic)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}
