import { Component, Output } from "@angular/core";
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
    userType;
    errors;
    truncatedName = [];
    truncatedDescription = [];
    showAvailableTasksComponent = false;
    showMyTasks = true
    pageName = 'My Tasks';
    tasks = 'Available Tasks';
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
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        this.router.navigate(['/login'])
    }

    loadAvailableTasksComponent() {
        this.showMyTasks = false
        this.showAvailableTasksComponent = true
        this.pageName = 'Tasks'
    }

    loadMyTasks() {
        this.showAvailableTasksComponent = false
        this.showMyTasks = true
        this.pageName = 'My Tasks'
    }

}