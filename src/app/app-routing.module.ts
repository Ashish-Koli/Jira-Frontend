import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { CanActivate, CanActivateAdmin } from './auth-gaurd';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'project',
    loadChildren: () =>
      import('./example-project/example-project.module').then(
        (m) => m.ExampleProjectModule
      ),
    canActivate: [CanActivateAdmin],
  },
  {
    path: 'epic',
    loadChildren: () => import('./epic/epic.module').then((m) => m.EpicModule),
    canActivate: [CanActivateAdmin],
  },
  {
    // path: 'project/board/sprint/:id',
    path: ':project/:board/:sprint/:id',
    loadChildren: () => import('./jira/jira.module').then((m) => m.JiraModule),
    canActivate: [CanActivate],
  },
  {
    path: 'sprint',
    loadChildren: () =>
      import('./sprint/sprint.module').then((m) => m.SprintModule),
    canActivate: [CanActivateAdmin],
  },
  {
    path: 'board',
    loadChildren: () =>
      import('./board/board.module').then((m) => m.BoardModule),
    canActivate: [CanActivateAdmin],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
