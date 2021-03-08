import { Component, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'available-tasks',
  templateUrl: './available-tasks.component.html',
  styleUrls: ['./available-tasks.component.css']
})
export class AvailableTasksComponent implements OnInit {
  availableTasks: Tasks[];
  @Output() currentTaskId;
  @Output() currentTaskName;
  @Output() currentTaskDesc;
  @Output() currentAssignedUserId;
  @Output() currentUsername;
  @Output() currentTaskAvailability;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAvailableTasks()
      .subscribe(data => {
        this.availableTasks = data
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
