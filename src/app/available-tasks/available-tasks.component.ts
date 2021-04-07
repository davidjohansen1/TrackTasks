import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'available-tasks',
  templateUrl: './available-tasks.component.html',
  styleUrls: ['./available-tasks.component.css']
})
export class AvailableTasksComponent implements OnInit {
  availableTasks: Tasks[];
  showEditModal = false;
  showDeleteModal = false;
  @Output() currentTaskId;
  @Output() deleteTaskId;
  @Output() deleteTaskName;
  @Output() deleteTaskDesc;
  @Output("reloadUnavailable") reloadUnavailable: EventEmitter<any> = new EventEmitter();
  @Output("reloadAssigned") reloadAssigned: EventEmitter<any> = new EventEmitter();
  @Output("deleteMessage") deleteMessage: EventEmitter<any> = new EventEmitter();
  @Input() supervised;
  @Input() availableRefresh;
  @Input() loggedInUserId;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAvailableTasks(this.loggedInUserId)
      .subscribe(data => {
        console.log(data);
        this.availableTasks = data
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

    if(reloadSibling === 'reloadAssigned') {
      this.reloadAssigned.emit();
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
