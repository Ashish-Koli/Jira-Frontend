import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProjectService } from 'src/app/project.service';

@Component({
  selector: 'app-project-detail',
  templateUrl: './project-detail.component.html',
  styleUrls: ['./project-detail.component.css'],
})
export class ProjectDetailComponent implements OnInit {
  project: any;

  constructor(
    private route: ActivatedRoute,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.getProjectDetails();
  }

  getProjectDetails(): void {
    const projectId = this.route.snapshot.paramMap.get('id'); // Get ID from route params
    if (projectId) {
      // this.project = this.projectService.getProjectById(+projectId);
    }
  }
}
