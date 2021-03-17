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
    showAllTasks = false;
    showMyTasks = true
    pageName = 'My Tasks';
    tasks = 'Available Tasks';

    showMyTasksToggle = false;
    showProfileToggle = false;
    showTasksToggle = false;
    showAboutToggle = false;

    @Output() currentTaskId;
    @Output() currentTaskName;
    @Output() currentTaskDesc;
    @Output() currentAssignedUserId;
    @Output() currentUsername;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.userName = localStorage.getItem('userName')
        this.showMyTasksToggle = true;
    }

    logOut() {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        localStorage.removeItem('userType');
        this.router.navigate(['/login'])
    }

    loadAllTasksComponent() {
        this.showMyTasksToggle = false;
        this.showTasksToggle = true;
        this.showMyTasks = false
        this.showAllTasks = true
        this.pageName = 'Tasks'
    }

    loadMyTasks() {
        this.showTasksToggle = false;
        this.showMyTasksToggle = true;
        this.showAllTasks = false
        this.showMyTasks = true
        this.pageName = 'My Tasks'
    }

}