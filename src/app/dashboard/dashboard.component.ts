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
    errors;
    truncatedName = [];
    truncatedDescription = [];
    showMyTasks = true;
    showProfile = false;
    showAllTasks = false;
    myUsers = false;
    showAbout = false;
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
        this.showMyTasks = true;
    }

    logOut() {
        localStorage.removeItem('userName');
        localStorage.removeItem('userId');
        this.router.navigate(['/login'])
    }

    loadAllTasksComponent() {
        this.showMyTasks = false
        this.myUsers = false;
        this.showAllTasks = true
        this.pageName = 'Manage Tasks'
    }

    loadMyTasks() {
        this.showAllTasks = false
        this.myUsers = false;
        this.showMyTasks = true
        this.pageName = 'My Tasks'
    }

    loadMyUsers() {
        this.showAllTasks = false;
        this.showMyTasks = false;
        this.myUsers = true;
        this.pageName = 'My Users'
    }

}