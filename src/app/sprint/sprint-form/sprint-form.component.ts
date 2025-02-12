import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SprintService } from 'src/app/services/sprint.service';
import {
  AddRelease,
  AddSprint,
  BoardResponse,
  EditSprint,
  SprintResponse,
} from 'src/app/dto/project';
import { BoardService } from 'src/app/services/board.service';
import { AuthService } from 'src/app/services/auth.service';
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
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private sprintService: SprintService,
    private boardService: BoardService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<SprintFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editSprint: EditSprint, id: number }
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    boardService.getAllBoardsByUserId(this.userId).subscribe((data) => {
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
      releaseName: ['', [Validators.required]],
    });

    if (this.data !== null) {
      this.editMode = true;
      this.currentIndex = this.data.id;
      this.value = 'Edit';
      this.sprintForm.patchValue(this.data.editSprint);
    }
  }
  save() {
    const sprint: AddSprint = {
      sprintNo: this.sprintForm.value.sprintNo,
      sprintName: this.sprintForm.value.sprintName,
      sprintPoint: this.sprintForm.value.sprintPoint,
      startDate: this.sprintForm.value.startDate,
      endDate: this.sprintForm.value.endDate,
      board: this.sprintForm.value.board,
    };

    if (this.editMode) {
      this.sprintService
        .updateSprint(sprint, this.currentIndex)
        .subscribe((data) => {
          const release: AddRelease = {
            sprint: data.sprintId,
            releaseName: this.sprintForm.value.releaseName,
          };
          this.sprintService
            .updateRelease(release)
            .subscribe(() => this.dialogRef.close(true));
        });
    } else {
      this.sprintService.createSprint(sprint).subscribe((data) => {
        const release: AddRelease = {
          sprint: data.sprintId,
          releaseName: this.sprintForm.value.releaseName,
        };
        this.sprintService
          .createRelease(release)
          .subscribe(() => this.dialogRef.close(true));
      });
    }
  }
}
