import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { map } from 'rxjs';
import { BoardFromComponent } from './board-from/board-from.component';
import { BoardService } from '../board.service';
import { AddBoard, BoardResponse } from '../dto/project';

export interface ProjectBackend {
  projectId: number;
  projectName: string;
  projectDescription: string;
}

@Component({
  selector: 'app-user',
  templateUrl: './board.component.html',
  styleUrls: ['./board.component.css'],
})
export class BoardComponent implements OnInit {
  userId: any;

  displayedColumns: string[] = ['boardId', 'boardName', 'project', 'actions'];
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private boardService: BoardService
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit() {
    this.fetchBoards();
  }

  boards!: BoardResponse[];

  fetchBoards() {
    this.boardService
      .getAllBoardsByUserId(this.userId)
      .subscribe((data: BoardResponse[]) => {
        this.boards = data;
        console.log(this.boards);
        this.dataSource = new MatTableDataSource(this.boards);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openForm(): void {
    const dialogRef = this.dialog.open(BoardFromComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchBoards();
    });
  }
  openProjectForm(board?: AddBoard, id?: any) {
    const editBoard = board;
    const dialogRef = this.dialog.open(BoardFromComponent, {
      data: { editBoard: editBoard, id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchBoards();
    });
  }

  deleteProject(boardId: number) {
    this.boardService.deleteBoard(boardId).subscribe(() => {
      this.fetchBoards();
    });
  }
}
