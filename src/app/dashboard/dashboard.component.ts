import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";

@Component({
    selector: 'dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
    allTasks: Tasks[];
    task = new Tasks();
    userName: String = '';
    errors;

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
                        if (this.allTasks[i].description.length > 50) {
                            this.allTasks[i].description = this.allTasks[i].description.substring(0, 50) + "..."
                        }
                    }
                })

    }


    createTask() {
        this.router.navigate(['/createtask'])
    }

    logOut() {
        localStorage.removeItem('userName');
        this.router.navigate(['/login'])
    }
}