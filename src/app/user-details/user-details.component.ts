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
  completed
  inProgress
  notStarted
  total

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.completed = 0
    this.inProgress = 0
    this.notStarted = 0
    this.total = 0
    this.apiService.getUserTasksBySupervisor(this.loggedInUserId, this.taskInfo.taskUserId)
    .subscribe(data => {
      this.tasks = data;
      this.tasks.forEach(task => {
        console.log(task.status)
        this.calculateTasks(task.status)
      })
      this.total = this.completed + this.inProgress + this.notStarted
    })    
  }

  back() {
    this.goBacktoMyUsers.emit();
  }

  calculateTasks(taskStatus) {
    switch(taskStatus) {
      case 'Completed':
        this.completed++
        break;
      case 'In Progress':
        this.inProgress++
        break;
      case 'Not Started':
        this.notStarted++
        break;
    }
  }
}
