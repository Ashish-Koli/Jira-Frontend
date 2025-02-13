import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { ProjectService } from '../services/project.service';
import { SharedService } from '../services/shared.service';
import { Router } from '@angular/router';
import { EventService } from '../services/event.service';
import { ProjectBoardResponse, ProjectBoardSprintsResponse, ProjectResponse, SprintResponse } from '../dto/project';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated!: boolean;
  role!: string;
  userId!: number;
  projects: ProjectResponse[] = [];

  constructor(
    private auth: AuthService,
    private projectService: ProjectService,
    private sharedService: SharedService,
    private updateEvent:EventService,
    private router: Router
  ) {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
      this.isAuthenticated = this.auth.isAuthenticated();
      if (this.isAuthenticated) {
        this.projectService
          .getAllProjectsByUserId(this.userId)
          .subscribe((data) => {
            this.projects = data;
          });
      }
      this.updateEvent.updateEvent.subscribe(()=>{
        if (this.isAuthenticated) {
          this.projectService
            .getAllProjectsByUserId(this.userId)
            .subscribe((data) => {
              this.projects = data;
            });
        }
      }) 
    });

    this.auth.role$.subscribe((role) => {
      this.role = role;
      this.isAuthenticated = this.auth.isAuthenticated();
    });
  }


  sprintClicked(project:ProjectResponse,board:ProjectBoardResponse,sprint:ProjectBoardSprintsResponse){
    this.router.navigate([project.projectName,board.boardName,sprint.sprintName,sprint.sprintId]);
    this.sharedService.setProjectDetails({project: project, board:board, sprint:sprint })
  }

  logoutMethod() {
    this.router.navigate(['/']);
    this.auth.logout();
  }



  ngOnInit(): void {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });

    this.auth.role$.subscribe((role) => {
      this.role = role;
    });
    this.isAuthenticated = this.auth.isAuthenticated();
  }
}
