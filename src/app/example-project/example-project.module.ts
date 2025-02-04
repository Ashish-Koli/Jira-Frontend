import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProjectDetailComponent } from './project-detail/project-detail.component';
import { ProjectFormComponent } from './project-form/project-form.component';
import { RouterModule } from '@angular/router';
import { ProjectComponent } from './project/project.component';
import { ProjectRoutingModule } from './project/example-project-routing.module';
import { MatOptionModule } from '@angular/material/core';

import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


import { MatTabsModule } from '@angular/material/tabs';
import { MatSelectModule } from '@angular/material/select';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { MatRippleModule } from '@angular/material/core';
import { MatMenuModule } from '@angular/material/menu';


@NgModule({
  declarations: [
    ProjectComponent,
    ProjectDetailComponent,
    ProjectFormComponent,
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    MatOptionModule,
    MatTabsModule,
    MatSelectModule,
    MatMenuModule,
    MatRippleModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule,
    DragDropModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports: [ProjectRoutingModule],
})
export class ExampleProjectModule {}
