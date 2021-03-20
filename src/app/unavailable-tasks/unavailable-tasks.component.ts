import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'unavailable-tasks',
  templateUrl: './unavailable-tasks.component.html',
  styleUrls: ['./unavailable-tasks.component.css']
})
export class UnavailableTasksComponent implements OnInit {
  unavailableTasks: Tasks[];
  showEditModal = false;
  showDeleteModal = false;
  @Output("reloadAvailable") reloadAvailable: EventEmitter<any> = new EventEmitter();
  @Output("reloadAssigned") reloadAssigned: EventEmitter<any> = new EventEmitter();
  @Output("deleteMessage") deleteMessage: EventEmitter<any> = new EventEmitter();
  @Output() currentTaskId;
  @Output() deleteTaskId;
  @Output() deleteTaskName;
  @Output() deleteTaskDesc;
  @Input() studentChildren;
  @Input() unavailableRefresh;
  
  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getUnavailableTasks()
      .subscribe(data => {
        this.unavailableTasks = data
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

    if(reloadSibling === 'reloadAvailable') {
      this.reloadAvailable.emit();
    }

    if(reloadSibling === 'reloadAssigned') {
      this.reloadAssigned.emit();
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }
}
