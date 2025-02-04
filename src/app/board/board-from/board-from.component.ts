import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { BoardService } from 'src/app/board.service';
import { AddBoard } from 'src/app/dto/project';
import { ProjectService } from 'src/app/project.service';

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
  projects: any[] = [];

  constructor(
    private fb: FormBuilder,
    private projectService: ProjectService,
    private boardService: BoardService,
    public dialogRef: MatDialogRef<BoardFromComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    projectService.getProjectNamesByUserId(1).subscribe((data) => {
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
      console.log(this.data);
      this.boardForm.patchValue(this.data.editBoard);
    }
  }

  save() {
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
