import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatDialog } from '@angular/material/dialog';
import { ProjectFormComponent } from '../project-form/project-form.component';
import { ProjectService } from 'src/app/project.service';
import { AuthService } from 'src/app/auth.service';
import { Project } from 'src/app/dto/project';

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
  dataSource = new MatTableDataSource<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  userId!: number;
  constructor(
    private projectService: ProjectService,
    private dialog: MatDialog,
    private auth: AuthService
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });
  }

  ngOnInit() {
    this.fetchProjects();
  }

  projects!: Project[];

  fetchProjects() {
    this.projectService
      .getAllProjectsByUserId(this.userId)
      .subscribe((data: Project[]) => {
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
    });
  }
  openProjectForm(project: Project, id: any) {
  
    const editProject:Project = project;
    console.log(editProject);
    const dialogRef = this.dialog.open(ProjectFormComponent, {
      data: { editProject: editProject, id: id },
    });

    dialogRef.afterClosed().subscribe(() => {
      this.fetchProjects();
    });
  }

  deleteProject(projectId: number) {
    this.projectService.deleteProject(projectId).subscribe(() => {
      this.fetchProjects();
    });
  }
}
