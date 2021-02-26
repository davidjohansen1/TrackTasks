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
    showCreateTaskComponent = false
    @Output() currentTaskId;
    @Output() currentTaskName;
    @Output() currentTaskDesc;
    @Output() currentAssignedUserId;
    @Output() currentUsername;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.userName = localStorage.getItem('userName')
        this.apiService.getTasks()
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
            })
    }

    editTask(id, name, description, assignedUserId, username) {
        this.currentTaskId = id;
        this.currentTaskName = name;
        this.currentTaskDesc = description;
        this.currentAssignedUserId = assignedUserId
        this.currentUsername = username;
    }

    reloadComponent() {
        this.ngOnInit();
    }
}