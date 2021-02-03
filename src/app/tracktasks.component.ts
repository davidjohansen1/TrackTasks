import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'tracktasks',
  template: `<router-outlet></router-outlet>`
  
})
export class TrackTasksComponent {
  constructor(private route:ActivatedRoute) {

  }
}
