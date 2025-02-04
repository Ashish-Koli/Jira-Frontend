import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JiraComponent } from './jira.component';
import { JiraRoutingModule } from './jiraRouting.module';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatMenuModule } from '@angular/material/menu';
import { CdkListboxModule } from '@angular/cdk/listbox';
import { RouterModule } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { StoryFormComponent } from './story-form/story-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {
  MatNativeDateModule,
  MatOptionModule,
  MatRippleModule,
} from '@angular/material/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { StoryDetailsComponent } from './story-details/story-details.component';

@NgModule({
  declarations: [
    JiraComponent,
    StoryFormComponent,
    StoryDetailsComponent,
  ],
  imports: [
    CommonModule,
    MatSidenavModule,
    MatSelectModule,
    MatButtonModule,
    MatListModule,
    MatSelectModule,
    DragDropModule,
    MatMenuModule,
    CdkListboxModule,
    RouterModule,
    MatCardModule,
    MatIconModule,
    ReactiveFormsModule,

    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,

    FormsModule,

    MatOptionModule,
    MatTabsModule,
    MatRippleModule,

    MatToolbarModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  exports: [JiraRoutingModule],
})
export class JiraModule {}
