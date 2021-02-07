import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { Users } from '../tasks/user';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
  })
  export class RegistrationComponent {
    title = 'tracktasks';
    selectedItem = 'supervisor';
    user = new Users();

    constructor(private apiService:ApiService) {}

    registerUser() {
      this.apiService.createUser(this.user)
      .subscribe(data => {
        console.log(data);
        if(data === 'User already exists') {
          alert('Username is already taken')
        } else {
          alert('User created successfully')
        }
      })
    }
  }