import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'in-progress',
  templateUrl: './in-progress.component.html',
  styleUrls: ['./in-progress.component.css']
})
export class InProgress implements OnInit {

  constructor(private apiService: ApiService) { }

  currentUserId;
  allTasks: Tasks[];
  errors;
  @Output() currentTaskId;
  @Output("reloadNotStarted") reloadNotStarted: EventEmitter<any> = new EventEmitter();
  @Output("reloadCompleted") reloadCompleted: EventEmitter<any> = new EventEmitter();
  @Input() inProcessRefresh;

  showEditModal = false;

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId')
    this.apiService.getUserInProgressTasks(+this.currentUserId)
        .subscribe(data => {
          console.log(data)
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
      this.reloadCompleted.emit();
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
