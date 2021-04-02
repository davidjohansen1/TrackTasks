import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Users } from '../tasks/user';

@Component({
  selector: 'my-users',
  templateUrl: './myUsers.component.html',
  styleUrls: ['./myUsers.component.css']
})
export class MyUsers implements OnInit {
  myUsersArray: Users[];
  hasUsers:boolean = false;
  showFindUsersModal = false;
  loggedInUserId;
  errors;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.apiService.getMyUsers(this.loggedInUserId)
    .subscribe(data => {
      console.log(data)
      this.myUsersArray = data;
    },
    error => {
        this.errors = error;
    },
    () => {
      if (this.myUsersArray.length > 0) {
        this.hasUsers = true;
      }
    })
  }

  closeModal() {
    this.ngOnInit();
    this.showFindUsersModal = false;
  }

  findUsers() {
    this.showFindUsersModal = true;
  }

  viewUserDetails() {
    console.log('this eventually will navigate to a new user details page')
  }

  remove() {
    console.log('this will delete the entry from the userToSupervisor table')
  }

  resend() {
    console.log('this will update the status in the userToSupervisor table back to pending')
  }

}
