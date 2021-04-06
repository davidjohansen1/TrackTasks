import { Component, OnInit, Output } from '@angular/core';
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
  showRemoveModal;
  @Output() userToSupervisorId;
  @Output() userName;
  @Output() first_name;
  @Output() last_name;

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

  resend() {
    console.log('this will update the status in the userToSupervisor table back to pending')
  }

  removeConfirmation(userToSupervisorId, userName, first_name, last_name) {
    this.userName = userName;
    this.userToSupervisorId = userToSupervisorId;
    this.first_name = first_name
    this.last_name = last_name
    this.showRemoveModal = true;
  }

  closeRemoveModal() {
    this.ngOnInit();
    this.showRemoveModal = false;
  }

}
