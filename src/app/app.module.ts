import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TrackTasksComponent } from './tracktasks.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { RegistrationComponent } from './registration/registration.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CreateTaskComponent } from './createTask/create-task.component';
import { HttpClientModule } from '@angular/common/http';
import { DropDownListModule } from '@syncfusion/ej2-angular-dropdowns';
import { TaskDetailsComponent } from './taskDetails/task-details.component';
import { AvailableTasks } from './avaiableTasks/available-tasks.component';
import { MyTasks } from './myTasks/mytasks.component';
import { UnavailableTasksComponent } from './unavailable-tasks/unavailable-tasks.component';

@NgModule({
  declarations: [
    TrackTasksComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    CreateTaskComponent,
    TaskDetailsComponent,
    AvailableTasks,
    MyTasks,
    UnavailableTasksComponent
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
