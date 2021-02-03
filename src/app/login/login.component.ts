import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
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
  
  loginUser(form: NgForm) {
    if(form.value.username.toUpperCase() === 'daveeed'.toUpperCase() && form.value.password === '1') {
      alert("You have successfully signed in")
    } else {
      alert("Incorrect username or password")
    }
  }
}
