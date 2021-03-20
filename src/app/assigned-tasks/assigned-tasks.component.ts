import { Component, Input, OnInit, Output } from '@angular/core';
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
  @Input() studentChildren;

  showEditModal = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAssignedTasks()
      .subscribe(data => {
        this.assignedTasks = data
      })
  }

  editTask(id) {
    this.currentTaskId = id;
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

  reloadComponent() {
    this.ngOnInit();
  }

}
