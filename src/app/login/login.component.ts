import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Users } from '../tasks/user';

@Component({
  selector: 'login',
  styleUrls: ['./login.component.css'],
  templateUrl: './login.component.html'

})
export class LoginComponent implements OnInit {
  constructor(private route: Router, private apiService: ApiService) { }

  title = 'tracktasks';
  user = new Users();

  ngOnInit() {
    if (localStorage.getItem('userName')) {
      this.route.navigate(['/dashboard'])
    }
  }

  loginUser() {
    this.apiService.authenticateUser(this.user)
      .subscribe(data => {
        if (this.user.username.toLocaleLowerCase() === data.credentials.toLocaleLowerCase()) {
          localStorage.setItem('userName', data.credentials)
          localStorage.setItem('userId', data.userId)
          this.route.navigate(['/dashboard'])
        } else {
          alert("Incorrect username or password")
        }
      })
  }

  checkEnterPressed(event) {
    if (event.keyCode == 13) {
      this.loginUser()
    }
  }
}
