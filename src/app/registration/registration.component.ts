import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.css']
  })
  export class RegistrationComponent {
    title = 'tracktasks';
    selectedItem = 'supervisor';

    registerUser(form: NgForm) {
      console.log(form.value.username)
      console.log(form.value.password)
      console.log(form.value.userTypes)
    }
  }