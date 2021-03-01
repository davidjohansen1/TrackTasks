import { Component, OnInit } from "@angular/core";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";

@Component({
    selector: 'mytasks',
    templateUrl: 'mytasks.component.html',
    styleUrls: ['mytasks.component.css']
})
export class MyTasks implements OnInit {
    constructor(private apiService: ApiService) { }
    currentUserId;
    allTasks: Tasks[];
    errors;
    truncatedName = [];
    truncatedDescription = [];
    hasTasks = true;

    ngOnInit() {
        this.currentUserId = localStorage.getItem('userId')
        this.apiService.getUserTasks(+this.currentUserId)
        .subscribe(data => {
            this.allTasks = data
        },
        error => {
            this.errors = error;
        },
        () => {
            if(this.allTasks.length === 0) {
                this.hasTasks = false;
            }
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
}