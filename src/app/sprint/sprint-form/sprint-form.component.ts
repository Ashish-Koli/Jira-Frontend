import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Sprint } from '../sprint.component';
import { SprintService } from 'src/app/sprint.service';
import { BoardResponse } from 'src/app/dto/project';
import { BoardService } from 'src/app/board.service';
@Component({
  selector: 'app-sprint-form',
  templateUrl: './sprint-form.component.html',
  styleUrls: ['./sprint-form.component.css'],
})
export class SprintFormComponent implements OnInit {
  sprintForm!: FormGroup;
  editMode: boolean = false;
  currentIndex!: number;
  value: string = 'Add';
  boards: BoardResponse[] = [];

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintService,
    private boardService: BoardService,
    public dialogRef: MatDialogRef<SprintFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    boardService.getAllBoardsByUserId(1).subscribe((data) => {
      this.boards = data;
    });
  }

  ngOnInit(): void {
    this.sprintForm = this.fb.group({
      sprintNo: [, [Validators.required]],
      sprintName: ['', [Validators.required]],
      sprintPoint: [, [Validators.required]],
      startDate: ['', [Validators.required]],
      endDate: ['', [Validators.required]],
      board: ['', [Validators.required]],
    });

    if (this.data !== null) {
      this.editMode = true;
      this.currentIndex = this.data.id;
      this.value = 'Edit';
      this.sprintForm.patchValue(this.data.editSprint);
    }
  }
  save() {
    console.log(this.sprintForm.value);
    const sprint: Sprint = this.sprintForm.value;
    if (this.editMode) {
      this.sprintService
        .updateSprint(sprint, this.currentIndex)
        .subscribe(() => this.dialogRef.close(true));
    } else {
      this.sprintService
        .createSprint(sprint)
        .subscribe(() => this.dialogRef.close(true));
    }
  }
}
