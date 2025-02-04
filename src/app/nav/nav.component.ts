import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { ProjectService } from '../project.service';
import { SharedService } from '../shared.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  isAuthenticated!: boolean;
  role!: string;
  userId!: number;

  constructor(
    private auth: AuthService,
    private projectService: ProjectService,
    private sharedService: SharedService,
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
            console.log(this.projects[0].boardList[0].sprintList[0].sprintId);
          });
      }
    });

    this.auth.role$.subscribe((role) => {
      console.log(role);
      this.role = role;
      this.isAuthenticated = this.auth.isAuthenticated();
    });
  }

  logoutMethod() {
    this.router.navigate(['/']);
    this.auth.logout();
  }

  projects: any[] = [];

  ngOnInit(): void {
    this.auth.userId$.subscribe((userId) => {
      this.userId = userId;
    });

    this.auth.role$.subscribe((role) => {
      this.role = role;
    });
    console.log(this.role);
    this.isAuthenticated = this.auth.isAuthenticated();
  }
}
