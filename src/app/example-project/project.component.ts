import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from './project-form/project-form.component';
import { ProjectService } from 'src/app/services/project.service';
import { AuthService } from 'src/app/services/auth.service';
import { AddProject, ProjectResponse, ProjectUsersResponse } from 'src/app/dto/project';
import { EventService } from '../services/event.service';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.css'],
})
export class ProjectComponent implements OnInit {
  displayedColumns: string[] = [
    'projectId',
    'projectName',
    'projectDescription',
    'actions',
  ];
  dataSource = new MatTableDataSource<ProjectResponse>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userId!: number;
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private auth: AuthService,
    private udpateEvent:EventService
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit() {
    this.fetchProjects();
  }

  projects!: ProjectResponse[];

  fetchProjects() {
    this.projectService
      .getAllProjectsByUserId(this.userId)
      .subscribe((data: ProjectResponse[]) => {
        this.projects = data;
        console.log(data);
        console.log(this.projects);
        this.dataSource = new MatTableDataSource(this.projects);
        console.log(this.dataSource);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  open() {
    const dialogRef = this.dialog.open(ProjectFormComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.fetchProjects();
      this.udpateEvent.update();

    });
  }
  openProjectForm(project: ProjectResponse, id: number) {
  
    const editProject:AddProject = {
      projectName:project.projectName,
      projectDescription:project.projectDescription,
      userList:project.userList.map((user:ProjectUsersResponse)=>{
        return user.userId;
      })
    };

    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: { editProject: editProject, id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchProjects();
      this.udpateEvent.update();
    });
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.fetchProjects();
      this.udpateEvent.update();

    });
  }
}
