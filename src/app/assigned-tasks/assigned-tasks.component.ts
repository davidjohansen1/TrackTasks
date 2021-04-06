import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'assigned-tasks',
  templateUrl: './assigned-tasks.component.html',
  styleUrls: ['./assigned-tasks.component.css']
})
export class AssignedTasksComponent implements OnInit {
  assignedTasks: Tasks[];
  showEditModal = false;
  showDeleteModal = false;
  @Output("reloadUnavailable") reloadUnavailable: EventEmitter<any> = new EventEmitter();
  @Output("reloadAvailable") reloadAvailable: EventEmitter<any> = new EventEmitter();
  @Output("deleteMessage") deleteMessage: EventEmitter<any> = new EventEmitter();
  @Output() currentTaskId;
  @Output() deleteTaskId;
  @Output() deleteTaskName;
  @Output() deleteTaskDesc;
  @Output() fromAssigned = true;
  @Input() supervised;
  @Input() assignedRefresh;
  @Input() loggedInUserId;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAssignedTasks(this.loggedInUserId)
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

  deleteConfirmation(id, taskName, taskDesc) {
    this.deleteTaskId = id
    this.deleteTaskName = taskName;
    this.deleteTaskDesc = taskDesc;
    this.showDeleteModal = true;
  }

  closeDeleteModal() {
    this.showDeleteModal = false;
  }

  reloadComponent(reloadSibling) {
    this.ngOnInit();

    if(reloadSibling === 'deleted task') {
      this.deleteMessage.emit();
    }
    
    if(reloadSibling === 'reloadUnavailable') {
      this.reloadUnavailable.emit();
    }

    if(reloadSibling === 'reloadAvailable') {
      this.reloadAvailable.emit();
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
