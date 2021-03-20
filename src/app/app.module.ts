import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackTasksComponent } from './tracktasks.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { HttpClientModule } from '@angular/common/http';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TaskDetailsComponent } from './taskDetails/task-details.component';
import { AllTasks } from './allTasks/alltasks.component';
import { MyTasks } from './myTasks/mytasks.component';
import { UnavailableTasksComponent } from './unavailable-tasks/unavailable-tasks.component';
import { EditTask } from './modals/edit-task-modal/edit-task.component';
import { AvailableTasksComponent } from './available-tasks/available-tasks.component';
import { AssignedTasksComponent } from './assigned-tasks/assigned-tasks.component';
import { NotStartedComponent } from './not-started/not-started.component';
import { EditMyTask } from './modals/edit-my-task-modal/edit-my-task';
import { InProgress } from './in-progress/in-progress.component';
import { Completed } from './completed/completed.component';

@NgModule({
  declarations: [
    TrackTasksComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    TaskDetailsComponent,
    AllTasks,
    MyTasks,
    UnavailableTasksComponent,
    EditTask,
    AvailableTasksComponent,
    AssignedTasksComponent,
    NotStartedComponent,
    EditMyTask,
    InProgress,
    Completed
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropDownListModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [TrackTasksComponent]
})
export class AppModule { }
