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
export class DashboardComponent {
    allTasks: Tasks[];
    task = new Tasks();
    user = new Users();
    userName: String = '';
    errors;
    truncatedName = [];
    truncatedDescription = [];
    userId;
    showCreateTaskComponent = false
    showAvailableTasksComponent = false
    pageName = 'Home';
    @Output() currentTaskId;
    @Output() currentTaskName;
    @Output() currentTaskDesc;
    @Output() currentAssignedUserId;
    @Output() currentUsername;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.userName = localStorage.getItem('userName')
    }

    logOut() {
        localStorage.removeItem('userName');
        this.router.navigate(['/login'])
    }

    loadCreateTaskComponent() {
        this.showAvailableTasksComponent = false
        this.showCreateTaskComponent = true
        this.pageName = 'Create Task'
    }

    loadAvailableTasksComponent() {
        this.showCreateTaskComponent = false
        this.showAvailableTasksComponent = true
        this.pageName = 'Available Tasks'
    }

}