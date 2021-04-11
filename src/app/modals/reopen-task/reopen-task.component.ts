import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'reopen-task',
  templateUrl: './reopen-task.component.html',
  styleUrls: ['./reopen-task.component.css']
})
export class ReopenTaskComponent implements OnInit {
  @Output("closeReopenModal") closeReopenModal: EventEmitter<any> = new EventEmitter();
  @Input() taskId;
  @Input() taskName;
  errors;
  selectedValue  = 'Not Started';

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  closeCurrentModal() {
    this.closeReopenModal.emit();
  }

  reopenTask() {
    console.log(this.selectedValue)
    this.apiService.updateTaskStatus(this.taskId, this.selectedValue)
    .subscribe(data => {
      if(data != 'task updated successfully') {
        alert('There was a problem updating the task status');
      }
    },
    error => {
      this.errors = error
    },
    () => {
      this.closeReopenModal.emit();
    })
  }

}
