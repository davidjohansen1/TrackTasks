import { Component } from '@angular/core';
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

  constructor(private apiService: ApiService) { }

  registerUser() {
    console.log(this.user.username)
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
        }
      })
  }

  checkEnterPressed(event) {
    if (event.keyCode == 13) {
      this.registerUser()
    }
  }
}