import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Users } from '../tasks/user';

@Component({
  selector: 'registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  title = 'tracktasks';
  user = new Users();

  constructor(private apiService: ApiService, private router: Router) { }

  registerUser() {
    if (this.user.username === undefined || this.user.password === undefined) {
      alert('Username and Password are required')
      return
    }
    this.apiService.createUser(this.user)
      .subscribe(data => {
        if (data === 'User already exists') {
          alert('Username is already taken')
        } else {
          alert('User created successfully')
          this.router.navigate(['/login'])
        }
      })
  }

  checkEnterPressed(event) {
    if (event.keyCode == 13) {
      this.registerUser()
    }
  }
}