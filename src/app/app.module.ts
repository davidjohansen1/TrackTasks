import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule }    from '@angular/forms';
import { TrackTasksComponent } from './tracktasks.component';

@NgModule({
  declarations: [
    TrackTasksComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [TrackTasksComponent]
})
export class AppModule { }
