import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'my-users',
  templateUrl: './myUsers.component.html',
  styleUrls: ['./myUsers.component.css']
})
export class MyUsers implements OnInit {
  myUsersArray = [
    {"name": "Daveeed", "status": "Pending"},
    {"name": "Pedrina", "status": "Accepted"},
    {"name": "Lucas", "status": "Rejected"}
  ];
  // myUsersArray = [];
  hasUsers:boolean = false;

  constructor() { }

  ngOnInit() {
    if (this.myUsersArray.length > 0) {
      this.hasUsers = true;
    }
  }

  findUsers() {
    alert('Later will load the find users modal')
  }

}
