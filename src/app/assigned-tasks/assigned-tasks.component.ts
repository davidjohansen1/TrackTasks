import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.css']
})
export class AssignedTasksComponent implements OnInit {
  assignedTasks: Tasks[];
  @Output() currentTaskId;
  @Output() currentTaskName;
  @Output() currentTaskDesc;
  @Output() currentAssignedUserId;
  @Output() currentUsername;
  @Output() currentTaskAvailability;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAssignedTasks()
      .subscribe(data => {
        this.assignedTasks = data
      })
  }

  editTask(id, name, description, assignedUserId, username, available) {
    this.currentTaskId = id;
    this.currentTaskName = name;
    this.currentTaskDesc = description;
    this.currentAssignedUserId = assignedUserId
    this.currentUsername = username;
    this.currentTaskAvailability = available;
  }

  reloadComponent() {
    this.ngOnInit();
  }

}
