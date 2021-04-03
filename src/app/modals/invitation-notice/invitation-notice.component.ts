import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'invitation-notice',
  templateUrl: './invitation-notice.component.html',
  styleUrls: ['./invitation-notice.component.css']
})
export class InvitationNoticeComponent implements OnInit {
  @Input() supervisorFirstName;
  @Input() supervisorLastName;
  @Input() supervisorUsername;
  @Input() inviteId;
  @Input() supervisorId;
  @Input() loggedInUserId;

  constructor(private apiService:ApiService) { }

  ngOnInit() {
  }

  accept() {
    this.apiService.inviteResponse(this.inviteId, this.loggedInUserId, this.supervisorId, 'Accepted')
    .subscribe(data => { })
  }

  decline() {
    this.apiService.inviteResponse(this.inviteId, this.loggedInUserId, this.supervisorId, 'Rejected')
    .subscribe(data => { })
  }

}
