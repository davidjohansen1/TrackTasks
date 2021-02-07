import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'
  
})
export class LoginComponent {
  constructor(private route:Router) {
    
  }
  title = 'tracktasks';
  
  loginUser(form: NgForm) {
    if(form.value.username.toUpperCase() === 'daveeed'.toUpperCase() && form.value.password === '1') {
      this.route.navigate(['/dashboard'])
    } else {
      alert("Incorrect username or password")
    }
  }
}
