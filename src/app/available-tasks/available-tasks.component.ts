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
  @Output() currentTaskId;
  @Input() studentChildren;
  @Input() availableRefresh;
  @Output("reloadUnavailable") reloadUnavailable: EventEmitter<any> = new EventEmitter();
  @Output("reloadAssigned") reloadAssigned: EventEmitter<any> = new EventEmitter();
  showEditModal = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.apiService.getAvailableTasks()
      .subscribe(data => {
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

  reloadComponent(reloadSibling) {
    this.ngOnInit();
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
