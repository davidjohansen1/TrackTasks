import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  showResendMessage = false;
  @Output() userToSupervisorId;
  @Output() userName;
  @Output() first_name;
  @Output() last_name;
  @Output("loadUserDetails") loadUserDetails: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.apiService.getMyUsers(this.loggedInUserId)
    .subscribe(data => {
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
    this.loadUserDetails.emit();
  }

  resend(userToSupervisorId, userId) {
    this.apiService.inviteResponse(userToSupervisorId, userId, this.loggedInUserId, 'Pending')
    .subscribe(data => {
        if(data != 'invited accepted') {
          alert('There was a problem updating the user');
        }
      },
      error => {
          this.errors = error;
      },
      () => {
        this.ngOnInit();
        this.showResendMessage = true;
        setTimeout(function() { 
          this.showResendMessage = false;
        }.bind(this), 5000)
      })
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
