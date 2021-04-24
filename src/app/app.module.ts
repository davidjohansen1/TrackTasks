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
import { NewTask } from './modals/newTask/newTask.component';
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
import { DeleteTaskComponent } from './modals/delete-task/delete-task.component';
import { MyUsers } from './myUsers/myUsers.component';
import { FindUsers } from './modals/find-users/findUsers.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { InvitationNoticeComponent } from './modals/invitation-notice/invitation-notice.component';
import { RemoveSupervised } from './modals/remove-supervised/remove-supervised.component';
import { UserDetailsComponent } from './user-details/user-details.component';
import { GoogleChartsModule } from 'angular-google-charts';
import { CloseTask } from './modals/close-task/close-task.component';
import { ReopenTaskComponent } from './modals/reopen-task/reopen-task.component';

@NgModule({
  declarations: [
    TrackTasksComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    NewTask,
    AllTasks,
    MyTasks,
    UnavailableTasksComponent,
    EditTask,
    AvailableTasksComponent,
    AssignedTasksComponent,
    NotStartedComponent,
    EditMyTask,
    InProgress,
    Completed,
    DeleteTaskComponent,
    MyUsers,
    FindUsers,
    InvitationNoticeComponent,
    RemoveSupervised,
    UserDetailsComponent,
    CloseTask,
    ReopenTaskComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    DropDownListModule,
    NgxPaginationModule,
    GoogleChartsModule,
    RouterModule.forRoot(appRoutes)
  ],
  providers: [],
  bootstrap: [TrackTasksComponent]
})
export class AppModule { }
