import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { ApiService } from "src/app/services/api.service";

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
    
    constructor(private apiService: ApiService){}

    ngOnInit() { }

    closeCurrentModal() {
        this.closeModal.emit();
    }

    clear() {
        this.foundUsers = '';
        this.searchTerm = null;
    }

    findUser() {
        this.apiService.findUsers(this.searchTerm)
        .subscribe(data => {
            console.log(data)
            this.users = data;
            if(this.users.length > 0) {
                this.foundUsers = 'usersFound';
            } else {
                this.foundUsers = 'usersNotFound';
            }
            this.ngOnInit();
        })
    }
}