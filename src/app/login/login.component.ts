import { Component } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
  
})
export class LoginComponent {
  constructor(private route:ActivatedRoute) {
    
  }
  title = 'tracktasks';
}
