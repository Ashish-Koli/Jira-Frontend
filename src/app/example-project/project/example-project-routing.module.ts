import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectComponent } from './project.component';
import { ProjectDetailComponent } from '../project-detail/project-detail.component';

const routes: Routes = [
  { path: '', component: ProjectComponent }, // Default parent component
  { path: ':id', component: ProjectDetailComponent }, // Child route for project details
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProjectRoutingModule {}
