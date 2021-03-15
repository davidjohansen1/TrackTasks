import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Tasks } from '../tasks/task';

@Component({
  selector: 'not-started',
  templateUrl: './not-started.component.html',
  styleUrls: ['./not-started.component.css']
})
export class NotStartedComponent implements OnInit {

  constructor(private apiService: ApiService) { }

  currentUserId;
  allTasks: Tasks[];
  errors;
  @Output() currentTaskId;
  @Input() notStartedRefresh;
  @Output("reloadinProcess") reloadinProcess: EventEmitter<any> = new EventEmitter();
  @Output("reloadCompleted") reloadCompleted: EventEmitter<any> = new EventEmitter();

  showEditModal = false;

  ngOnInit() {
    this.currentUserId = localStorage.getItem('userId')
    this.apiService.getUserNotStartTasks(+this.currentUserId)
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
      this.reloadinProcess.emit();
      this.reloadCompleted.emit();
    }
  }

  ngOnChanges() {
    this.ngOnInit();
  }

}
