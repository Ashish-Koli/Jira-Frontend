import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { map, retry } from 'rxjs';
import { SprintFormComponent } from './sprint-form/sprint-form.component';
import { SprintService } from '../services/sprint.service';
import { AddSprint, EditSprint, SprintResponse } from '../dto/project';
import { EventService } from '../services/event.service';

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
    'releaseName',
    'actions',
  ];
  dataSource!: MatTableDataSource<SprintResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private sprintService: SprintService,
    private udpateEvent:EventService
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
      this.udpateEvent.update();

    });
  }
  openProjectForm(sprint: SprintResponse, id: number) {
    const editSprint:EditSprint = {
      sprintNo: sprint.sprintNo,
      sprintName: sprint.sprintName,
      sprintPoint: sprint.sprintPoint,
      startDate: sprint.startDate,
      endDate: sprint.endDate,
      board: sprint.board.boardId,
      releaseName:sprint.release.releaseName,
    };
    console.log(editSprint);
    const dialogRef = this.dialog.open(SprintFormComponent, {
      data: { editSprint: editSprint, id: id },
    });
    dialogRef.afterClosed().subscribe(() => {
      this.fetchEpics();
      this.udpateEvent.update();

    });
  }

  deleteSprint(sprintId: number) {
    this.sprintService.deleteSprint(sprintId).subscribe(() => {
      this.fetchEpics();
      this.udpateEvent.update();

    });
  }
}
