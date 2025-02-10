import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { EpicFormComponent } from './epic-form/epic-form.component';
import { EpicService } from '../services/epic.service';
import { AddEpic, EpicResponse } from '../dto/project';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-epic',
  templateUrl: './epic.component.html',
  styleUrls: ['./epic.component.css'],
})
export class EpicComponent implements OnInit {
  userId!: number;
  displayedColumns: string[] = [
    'epicId',
    'epicName',
    'description',
    'project',
    'actions',
  ];
  dataSource!: MatTableDataSource<EpicResponse>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    public dialog: MatDialog,
    private auth: AuthService,
    private epicService: EpicService,
    private udpateEvent:EventService
    
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit() {
    this.fetchEpics();
  }

  epics!: EpicResponse[];

  fetchEpics() {
    this.epicService
      .getAllEpicByUserId(this.userId)
      .subscribe((data: EpicResponse[]) => {
        this.epics = data;
        // console.log(data);
        this.dataSource = new MatTableDataSource(this.epics);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open() {
    const dialogRef = this.dialog.open(EpicFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchEpics();
      this.udpateEvent.update();

    });
  }
  openProjectForm(epic: EpicResponse, id: number) {
    const editEpic:AddEpic = {
      epicName:epic.epicName,
      description:epic.description,
      project:epic.projectId
    };
    console.log(epic);
    console.log(editEpic);
    const dialogRef = this.dialog.open(EpicFormComponent, {
      data: { editEpic: editEpic, id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchEpics();
      this.udpateEvent.update();

    });
  }

  deleteProject(epicId: number) {
    this.epicService.deleteEpic(epicId).subscribe(() => {
      this.fetchEpics();
      this.udpateEvent.update();

    });
  }
}
