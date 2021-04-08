import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Output("goBacktoMyUsers") goBacktoMyUsers: EventEmitter<any> = new EventEmitter();
  loggedInUserId;
  tasks: Tasks[];
  @Input() taskInfo

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.apiService.getUserTasksBySupervisor(this.loggedInUserId, this.taskInfo.taskUserId)
    .subscribe(data => {
      this.tasks = data;
    })    
  }

  back() {
    this.goBacktoMyUsers.emit();
  }
}
