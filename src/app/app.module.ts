import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ProjectComponent } from './project/project.component';
import { ProjectFormComponent } from './project/project-form/project-form.component';
import { ProjectsListComponent } from './project/projects-list/projects-list.component';
import { TaskFormComponent } from './project-details/task-form/task-form.component';
import { TasksListComponent } from './project-details/tasks-list/tasks-list.component';
import { ProjectService } from './services/project/project.service';
import { TaskService } from './services/task/task.service';
import { SelectProjectComponent } from './select-project/select-project.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    ProjectComponent,
    ProjectFormComponent,
    ProjectsListComponent,
    TaskFormComponent,
    TasksListComponent,
    routingComponents,
    SelectProjectComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot()
  ],
  providers: [ProjectService,TaskService],
  bootstrap: [AppComponent]
})
export class AppModule { }
