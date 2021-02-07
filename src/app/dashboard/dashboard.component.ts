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
    allTasks:Tasks[];
    task = new Tasks();
    userName:String = '';

    constructor(private apiService:ApiService, private router:Router) {}

    ngOnInit() {
        this.userName = localStorage.getItem('userName')
        console.log(this.userName)
        this.apiService.getTasks()
        .subscribe(data => {
            console.log(data)
            this.allTasks=data
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