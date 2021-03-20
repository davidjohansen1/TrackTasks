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
    userType;
    showNewModal = false;
    @Output() studentChildren = [];
    @Output() unavailableRefresh;
    @Output() availableRefresh;
    @Output() assignedRefresh;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.userType = localStorage.getItem('userType')
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                this.studentChildren = data
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
}