import { Component, Input, OnInit, Output } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";

@Component({
    templateUrl: './alltasks.component.html',
    selector: 'alltasks',
    styleUrls: ['alltasks.component.css']
})
export class AllTasks implements OnInit {
    allTasks: Tasks[];
    task = new Tasks();
    user = new Users();
    errors;
    showNewModal = false;
    showDeletedMessage = false;
    @Output() supervised = [];
    @Output() unavailableRefresh;
    @Output() availableRefresh;
    @Output() assignedRefresh;
    @Input() loggedInUserId;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.apiService.getSupervised(this.loggedInUserId)
            .subscribe(data => {
                this.supervised = data
                this.supervised.push({"id":+localStorage.getItem('userId'), "username":localStorage.getItem('userName')})

                if(!this.supervised.includes(0)) {
                    this.supervised.unshift({"id":0, "username":''})
                }
            })
    }   

    createTask() {
        this.showNewModal = true;
    }

    closeModal() {
        this.showNewModal = false;
    }

    reloadComponent() {
        this.ngOnInit();
    }

    reloadUnavailable() { 
        this.unavailableRefresh = !this.unavailableRefresh;
    }

    reloadAvailable() { 
        this.availableRefresh = !this.availableRefresh;
    }

    reloadAssigned() { 
        this.assignedRefresh = !this.assignedRefresh;
    }

    deleteMessage() {
        this.showDeletedMessage = true;
        setTimeout(function() { 
            this.showDeletedMessage = false;
        }.bind(this), 5000)
    }
}