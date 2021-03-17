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
    userName: String = '';
    errors;
    truncatedName = [];
    truncatedDescription = [];
    userId;
    userType;
    showCreateTaskComponent = false;
    currentTask = 0;
    currentTaskSet = [];
    counter;
    noTasksExistMessage: String;
    noTasksExistMessage2: String;
    currentTaskSetName;

    notYetAvailable = true;
    available = false;
    assigned = false;
    
    showNotYetAvailabletoggle = false;
    showAvailablToggle = false;
    showAssignedToggle = false

    @Output() currentTaskId;
    @Output() currentTaskName;
    @Output() currentTaskDesc;
    @Output() currentAssignedUserId;
    @Output() currentUsername;
    @Output() currentTaskAvailability;
    @Output() newTask: boolean = false;

    constructor(private apiService: ApiService) { }

    ngOnInit() {
        this.userName = localStorage.getItem('userName')
        this.userType = localStorage.getItem('userType')
        this.apiService.getAllTasks()
            .subscribe(data => {
                this.allTasks = data
            },
            error => {
                this.errors = error;
            },
            () => {
                if((this.userType === 'child') || (this.userType === 'employee')) {
                    this.showAvailable();
                } else {
                    this.showNotYetAvailable();
                }
            })
    }   

    showNotYetAvailable() {
        this.showAssignedToggle = false
        this.showAvailablToggle = false
        this.showNotYetAvailabletoggle = true;

        this.available = false
        this.assigned = false
        this.notYetAvailable = true

        this.currentTaskSetName = 'Showing Unavailable Tasks';
        this.currentAssignedUserId = null;
    }

    showAvailable() {
        this.showNotYetAvailabletoggle = false
        this.showAssignedToggle = false
        this.showAvailablToggle = true

        this.notYetAvailable = false
        this.assigned = false
        this.available = true
        this.currentTaskSetName = 'Showing Available Tasks';
        this.currentAssignedUserId = null;
    }

    showAssigned() {
        this.showAssignedToggle = true
        this.showAvailablToggle = false
        this.showNotYetAvailabletoggle = false
        this.currentTaskSetName = 'Showing Assigned Tasks';
        this.notYetAvailable = false
        this.available = false
        this.assigned = true
    }

    createTask() {
        this.currentTaskId = null;
        this.currentTaskName = null;
        this.currentTaskDesc = null;
        this.currentAssignedUserId = null;
        this.currentUsername = null;
        this.currentTaskAvailability = null;
    }

    reloadComponent() {
        this.notYetAvailable = false
        this.ngOnInit();
    }
}