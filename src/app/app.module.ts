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

@NgModule({
  declarations: [
    TrackTasksComponent,
    LoginComponent,
    RegistrationComponent,
    DashboardComponent,
    CreateTaskComponent
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
