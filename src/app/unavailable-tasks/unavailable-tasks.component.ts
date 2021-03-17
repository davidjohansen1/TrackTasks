import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'unavailable-tasks',
  templateUrl: './unavailable-tasks.component.html',
  styleUrls: ['./unavailable-tasks.component.css']
})
export class UnavailableTasksComponent implements OnInit {
  unavailableTasks: Tasks[];
  @Output() currentTaskId;
  @Output() currentTaskName;
  @Output() currentTaskDesc;
  @Output() currentAssignedUserId;
  @Output() currentUsername;
  @Output() currentTaskAvailability;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUnavailableTasks()
      .subscribe(data => {
        this.unavailableTasks = data
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
