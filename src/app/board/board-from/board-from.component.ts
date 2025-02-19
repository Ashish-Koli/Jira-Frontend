import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { BoardService } from 'src/app/services/board.service';
import { AddBoard, ProjectNamesResponse, ProjectResponse } from 'src/app/dto/project';
import { ProjectService } from 'src/app/services/project.service';

@Component({
  selector: 'app-board-from',
  templateUrl: './board-from.component.html',
  styleUrls: ['./board-from.component.css'],
})
export class BoardFromComponent implements OnInit {
  boardForm!: FormGroup;
  editMode: boolean = false;
  currentIndex!: number;
  value: string = 'Add';
  projects: ProjectNamesResponse[] = [];
  userId!: number;

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private boardService: BoardService,
    private auth: AuthService,
    public dialogRef: MatDialogRef<BoardFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { editBoard: AddBoard; id: number }
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
    this.projectService
      .getProjectNamesByUserId(this.userId)
      .subscribe((data) => {
        this.projects = data;
      });
  }

  ngOnInit(): void {
    this.boardForm = this.fb.group({
      boardName: ['', [Validators.required]],
      project: ['', [Validators.required]],
    });

    if (this.data !== null) {
      this.editMode = true;
      this.currentIndex = this.data.id;
      this.value = 'Edit';
      this.boardForm.patchValue(this.data.editBoard);
    }
  }

  save() {
    if(this.boardForm.valid){
      const newBoard: AddBoard = this.boardForm.value;
      if (this.editMode) {
        this.boardService
          .updateBoard(newBoard, this.currentIndex)
          .subscribe(() => this.dialogRef.close(true));
      } else {
        this.boardService
          .createBoard(newBoard)
          .subscribe(() => this.dialogRef.close(true));
      }
    }
   
  }
}
