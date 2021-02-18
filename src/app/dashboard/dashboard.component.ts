import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    allTasks: Tasks[];
    task = new Tasks();
    user = new Users();
    userName: String = '';
    errors;
    truncatedName = [];
    truncatedDescription = [];
    @Output() currentTaskId;
    @Output() currentTaskName;
    @Output() currentTaskDesc;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.userName = localStorage.getItem('userName')
        this.apiService.getTasks()
            .subscribe(data => {
                console.log(data)
                this.allTasks = data
            },
                error => {
                    this.errors = error;
                },
                () => {
                    for (var i = 0; i < this.allTasks.length; i++) {
                        if (this.allTasks[i].description.length > 75) {
                            this.truncatedDescription[this.allTasks[i].id] = this.allTasks[i].description.substring(0, 75) + "..."
                        }

                        if (this.allTasks[i].name.length > 40) {
                            this.truncatedName[this.allTasks[i].id] = this.allTasks[i].name.substring(0, 40) + "..."
                        }
                    }
                    console.log(this.truncatedDescription)
                })

    }


    createTask() {
        this.router.navigate(['/createtask'])
    }

    logOut() {
        localStorage.removeItem('userName');
        this.router.navigate(['/login'])
    }

    editTask(id, name, description) {
        this.currentTaskId = id;
        this.currentTaskName = name;
        this.currentTaskDesc = description;
    }
}