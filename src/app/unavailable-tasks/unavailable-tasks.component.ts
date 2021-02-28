import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";

@Component({
    templateUrl: './unavailable-tasks.component.html',
    selector: 'unavailable-tasks',
    styleUrls: ['unavailable-tasks.component.css']
})
export class UnavailableTasksComponent implements OnInit {
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
        this.apiService.getUnAvailableTasks()
            .subscribe(data => {
              console.log(data)
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
}