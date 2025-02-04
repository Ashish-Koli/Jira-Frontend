import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { map, retry } from 'rxjs';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintService } from '../sprint.service';
import { SprintResponse } from '../dto/project';
export interface Sprint {
  sprintId: number;
  sprintNo: number;
  sprintName: string;
  sprintPoint: number;
  startDate: Date;
  endDate: Date;
  board: string;
}

@Component({
  selector: 'app-sprint',
  templateUrl: './sprint.component.html',
  styleUrls: ['./sprint.component.css'],
})
export class SprintComponent implements OnInit {
  userId!: number;

  displayedColumns: string[] = [
    'sprintId',
    'sprintNo',
    'sprintName',
    'sprintPoint',
    'startDate',
    'endDate',
    'board',
    'actions',
  ];
  dataSource!: MatTableDataSource<SprintResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private sprintService: SprintService
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit() {
    this.fetchEpics();
  }

  sprints: SprintResponse[] = [];

  fetchEpics() {
    this.sprintService
      .getAllSprintByUserId(this.userId)
      .subscribe((data: SprintResponse[]) => {
        this.sprints = data;
        console.log(data);
        this.dataSource = new MatTableDataSource(this.sprints);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open() {
    const dialogRef = this.dialog.open(SprintFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchEpics();
    });
  }
  openProjectForm(sprint: any, id: any) {
    const editSprint = sprint;
    console.log(id);
    const dialogRef = this.dialog.open(SprintFormComponent, {
      data: { editSprint: editSprint, id: id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchEpics();
    });
  }

  deleteSprint(sprintId: number) {
    this.sprintService.deleteSprint(sprintId).subscribe(() => {
      this.fetchEpics();
    });
  }
}
