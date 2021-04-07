import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.css']
})
export class UserDetailsComponent implements OnInit {
  @Output("goBacktoMyUsers") goBacktoMyUsers: EventEmitter<any> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

  back() {
    this.goBacktoMyUsers.emit();
  }
}
