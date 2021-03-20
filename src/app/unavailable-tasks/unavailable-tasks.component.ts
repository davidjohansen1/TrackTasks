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
  @Output("reloadAvailable") reloadAvailable: EventEmitter<any> = new EventEmitter();
  @Output("reloadAssigned") reloadAssigned: EventEmitter<any> = new EventEmitter();
  @Output() currentTaskId;
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

  reloadComponent(reloadSibling) {
    this.ngOnInit();
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
