import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Tasks } from 'src/app/tasks/task';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'delete-task',
  templateUrl: './delete-task.component.html',
  styleUrls: ['./delete-task.component.css']
})
export class DeleteTaskComponent implements OnInit {
  @Input() deleteTaskId;
  @Input() deleteTaskName;
  @Input() deleteTaskDesc;
  @Output("closeDeleteModal") closeDeleteModal: EventEmitter<any> = new EventEmitter();
  @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
  task = new Tasks();
  errors;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    console.log('deleting task', this.deleteTaskId)
  }

  closeCurrentModal() {
    this.closeDeleteModal.emit();
  }

  deleteTask() {
    console.log("task with id will be deleted:", this.deleteTaskId)
    this.apiService.deleteTask(this.deleteTaskId)
    .subscribe(data => {
      if(data != 'task successfully deleted') {
          alert('There was a problem deleting the task');
      }
    },
    error => {
        this.errors = error;
    },
    () => {
        this.closeDeleteModal.emit();
        this.reloadComponent.emit('deleted task');
    })
  }

}
