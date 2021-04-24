import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'remove-supervised',
  templateUrl: './remove-supervised.component.html',
  styleUrls: ['./remove-supervised.component.css']
})
export class RemoveSupervised implements OnInit {
  errors;
  @Input() userToSupervisorId;
  @Input() userName;
  @Input() first_name;
  @Input() last_name;
  @Output("closeRemoveModal") closeRemoveModal: EventEmitter<any> = new EventEmitter();

  constructor(private apiService: ApiService) { }

  ngOnInit() {
  }

  closeCurrentModal() {
    this.closeRemoveModal.emit();
  }

  removeUserToSup() {
    this.apiService.deleteUserToSupervisor(this.userToSupervisorId)
    .subscribe(data => {
      if(data != 'User to supervisor successfully deleted') {
          alert('There was a problem removing the user');
      }
    },
    error => {
        this.errors = error;
    },
    () => {
        this.closeRemoveModal.emit();
    })
  }

}
