import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'completed',
  templateUrl: './completed.component.html',
  styleUrls: ['./completed.component.css']
})
export class Completed implements OnInit {

  constructor(private apiService: ApiService) { }

  currentUserId;
  allTasks: Tasks[];
  errors;
  @Output() currentTaskId;
  @Output("reloadNotStarted") reloadNotStarted: EventEmitter<any> = new EventEmitter();
  @Output("reloadinProcess") reloadinProcess: EventEmitter<any> = new EventEmitter();
  @Input() completedRefresh;

  showEditModal = false;

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId')
    this.apiService.getUserCompletedTasks(+this.currentUserId)
        .subscribe(data => {
            this.allTasks = data;
        })
  }

  editTask(id) {
    this.currentTaskId = id;
    this.showEditModal = true;
  }

  closeModal() {
    this.showEditModal = false;
  }

  reloadComponent(reloadSibling) {
    this.ngOnInit();
    if(reloadSibling === 'reload') {
      this.reloadNotStarted.emit();
      this.reloadinProcess.emit();
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
