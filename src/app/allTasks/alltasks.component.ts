import { Component, OnInit, Output } from "@angular/core";
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
    @Output() studentChildren = [];
    @Output() unavailableRefresh;
    @Output() availableRefresh;
    @Output() assignedRefresh;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                this.studentChildren = data
                this.studentChildren.unshift({"id": 0, "username": ""})
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