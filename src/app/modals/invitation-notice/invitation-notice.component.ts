import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  accept() {
    console.log('User has accepted this invitation. going to update invite #', this.inviteId)
  }

  decline() {
    console.log('User has declined this invitation. going to update invite #', this.inviteId)
  }

}
