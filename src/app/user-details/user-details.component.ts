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
  @Output() taskId;
  @Input() taskInfo;
  loggedInUserId;
  tasks: Tasks[];
  completed
  inProgress
  notStarted
  total
  data = [];
  completedPercentage
  inProgressPercentage
  notStartedPercentage
  title = 'User\'s Tasks';
  type='PieChart';
  columnNames = ['Status', 'Percentage'];
  options = {    
      pieHole:0.3,
      enableInteractivity : false,
      colors: ['#5cb85c', '#269abc', '#d9534f']
  };
  showCloseTaskModal;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.loggedInUserId = localStorage.getItem('userId');
    this.completed = 0
    this.inProgress = 0
    this.notStarted = 0
    this.total = 0
    this.apiService.getUserTasksBySupervisor(this.loggedInUserId, this.taskInfo.taskUserId)
    .subscribe(taskData => {
      this.tasks = taskData;
      this.tasks.forEach(task => {
        this.calculateTasks(task.status)
      })
      this.total = this.completed + this.inProgress + this.notStarted;
      this.completedPercentage = this.completed / this.total;
      this.inProgressPercentage = this.inProgress / this.total;
      this.notStartedPercentage = this.notStarted / this.total;
      this.data = [
        ['Completed(' + (this.completedPercentage * 100).toFixed(1) + '%)', this.completedPercentage * 100],
        ['In Progress(' + (this.inProgressPercentage * 100).toFixed(1) + '%)' , this.inProgressPercentage * 100],
        ['Not Started(' + (this.notStartedPercentage * 100).toFixed(1) + '%)', this.notStartedPercentage * 100]
     ];
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

  closeRemoveModal() {
    this.showCloseTaskModal = false;
    this.ngOnInit();
  }

  closeTask(taskId) {
    this.taskId = taskId;
    this.showCloseTaskModal = true;
  }
}
