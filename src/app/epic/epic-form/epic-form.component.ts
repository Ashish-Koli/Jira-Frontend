import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardFromComponent } from '../../board/board-from/board-from.component';
import { Epic } from '../epic.component';
import { EpicService } from 'src/app/epic.service';
import { ProjectService } from 'src/app/project.service';
import { map } from 'rxjs';
export interface ProjectNames {
  projectId: number;
  projectName: string;
}

@Component({
  selector: 'app-epic-form',
  templateUrl: './epic-form.component.html',
  styleUrls: ['./epic-form.component.css'],
})
export class EpicFormComponent implements OnInit {
  editMode: boolean = false;
  currentIndex!: number;
  value: string = 'Add';

  projects: ProjectNames[] = [];

  epicForm!: FormGroup;
  constructor(
    private fb: FormBuilder,
    private epicService: EpicService,
    private projectService: ProjectService,
    public dialogRef: MatDialogRef<BoardFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    projectService
      .getProjectNamesByUserId(1)
      .pipe(
        map((data: any) => {
          return data?.map((obj: ProjectNames) => {
            return {
              projectId: obj.projectId,
              projectName: obj.projectName,
            };
          });
        })
      )
      .subscribe((projectNameList: ProjectNames[]) => {
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
    const epic: Epic = this.epicForm.value;
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
