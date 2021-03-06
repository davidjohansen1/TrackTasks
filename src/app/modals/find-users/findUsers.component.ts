import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ApiService } from "src/app/services/api.service";
import { UserToSupervisor } from "src/app/tasks/userToSupervisor";

@Component({
    templateUrl: './findUsers.component.html',
    selector: 'findUsers',
    styleUrls: ['./findUsers.component.css']
})
export class FindUsers implements OnInit {
    @Output("closeModal") closeModal: EventEmitter<any> = new EventEmitter();
    searchTerm;
    users = [];
    foundUsers = '';
    loggedInUserId;
    p: number = 1;
    invitedButtons = [];
    userToSupervisor = new UserToSupervisor();
    
    constructor(private apiService: ApiService){}

    ngOnInit() { 
        this.loggedInUserId = localStorage.getItem('userId')
    }

    closeCurrentModal() {
        this.closeModal.emit();
    }

    clear() {
        this.foundUsers = '';
        this.searchTerm = null;
    }

    findUser() {
        this.apiService.findUsers(this.searchTerm, this.loggedInUserId)
        .subscribe(data => {
            this.users = data;
            if(this.users.length > 0) {
                this.foundUsers = 'usersFound';
            } else {
                this.foundUsers = 'usersNotFound';
            }
            this.ngOnInit();
        })
    }
    
    checkEnterPressed(event) {
        if (event.keyCode == 13) {
          this.findUser()
        }   
    }

    inviteUser(userId) {
        this.invitedButtons[userId] = 'Invited'

        this.userToSupervisor.userId = userId;
        this.userToSupervisor.supervisorId = this.loggedInUserId;

        this.apiService.inviteUser(this.userToSupervisor)
        .subscribe(data => { })
    }
}