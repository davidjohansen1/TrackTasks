import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";

@Component({
    templateUrl: './available-tasks.component.html',
    selector: 'available-tasks',
    styleUrls: ['available-tasks.component.css']
})
export class AvailableTasks implements OnInit {
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
    currentTaskSetName;
    counter;
    noTasksExistMessage: String;
    noTasksExistMessage2: String;

    @Output() currentTaskId;
    @Output() currentTaskName;
    @Output() currentTaskDesc;
    @Output() currentAssignedUserId;
    @Output() currentUsername;
    @Output() currentTaskAvailability;

    constructor(private apiService: ApiService, private router: Router) { }

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
                for (var i = 0; i < this.allTasks.length; i++) {
                    if(this.allTasks[i].description === null ) {
                        continue;
                    }
                    if (this.allTasks[i].description.length > 75) {
                        this.truncatedDescription[this.allTasks[i].id] = this.allTasks[i].description.substring(0, 75) + "..."
                    }

                    if (this.allTasks[i].name.length > 40) {
                        this.truncatedName[this.allTasks[i].id] = this.allTasks[i].name.substring(0, 40) + "..."
                    }
                }

                if((this.userType === 'child') || (this.userType === 'employee')) {
                    this.showAvailable();
                } else {
                    this.showNotYetAvailable();
                }
            })
    }

    showNotYetAvailable() {
        this.currentTaskSet = [];
        this.counter = 0;
        this.currentTaskSetName = 'Showing Unavailable Tasks';
        for(var i = 0; i < this.allTasks.length; i++) {
            if((this.allTasks[i].assigned_user === 0) && (this.allTasks[i].available === false)) {
                this.currentTaskSet[this.counter] = this.allTasks[i]
                this.counter++;
            }
        }
        if(this.currentTaskSet.length <= 0) {
            this.setNoTaskMessage('There aren\'t any unavailable tasks at this time.',
                                    'Either there haven\'t been any tasks created yet, or they\'re all currently marked available or assigned.')
        } else {
            this.setNoTaskMessage('', '');
        }
    }

    showAvailable() {
        this.currentTaskSet = [];
        this.counter = 0;
        this.currentTaskSetName = 'Showing Available Tasks';
        for(var i = 0; i < this.allTasks.length; i++) {
            if((this.allTasks[i].assigned_user === 0) && (this.allTasks[i].available === true)) {
                this.currentTaskSet[this.counter] = this.allTasks[i]
                this.counter++;
            }
        }
        if(this.currentTaskSet.length <= 0) {
            this.setNoTaskMessage('There aren\'t any available tasks at this time.',
                                    'Either there haven\'t been any tasks created yet, or they\'re all currently unavailable or assigned.');
        } else {
            this.setNoTaskMessage('', '');
        }
    }

    showAssigned() {
        this.currentTaskSet = [];
        this.counter = 0;
        this.currentTaskSetName = 'Showing Assigned Tasks';
        for(var i = 0; i < this.allTasks.length; i++) {
            if((this.allTasks[i].assigned_user != 0)) {
                this.currentTaskSet[this.counter] = this.allTasks[i]
                this.counter++;
            }
        }
        if(this.currentTaskSet.length <= 0) {
            this.setNoTaskMessage('There are no assigned tasks at this time.', '')
        } else {
            this.setNoTaskMessage('', '');
        }
    }

    editTask(id, name, description, assignedUserId, username, available) {
        this.currentTaskId = id;
        this.currentTaskName = name;
        this.currentTaskDesc = description;
        this.currentAssignedUserId = assignedUserId
        this.currentUsername = username;
        this.currentTaskAvailability = available;
    }

    reloadComponent() {
        this.ngOnInit();
    }

    setNoTaskMessage(string1, string2) {
        this.noTasksExistMessage = string1;
        this.noTasksExistMessage2 = string2;
    }
}