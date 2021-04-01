import { Component, ElementRef, Output, ViewChild } from "@angular/core";
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
    loggedInUserName: String = '';
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
    inviteStatus;
    @Output() supervisorId;
    @Output() inviteId;
    @Output() supervisorFirstName;
    @Output() supervisorLastName;
    @Output() supervisorUsername;
    @Output() loggedInUserId;

    constructor(private apiService: ApiService, private router: Router) { }
    @ViewChild('openModal') openModal:ElementRef;

    ngOnInit() {
        this.loggedInUserName = localStorage.getItem('userName')
        this.loggedInUserId = localStorage.getItem('userId');
        this.showMyTasks = true;
        this.apiService.checkInvitations(this.loggedInUserId)
        .subscribe(data => {
            if(data) {
                this.inviteStatus = data.status;
                this.inviteId = data.id;
                this.supervisorId = data.supervisor_id;
                this.supervisorFirstName = data.first_name;
                this.supervisorLastName = data.last_name;
                this.supervisorUsername = data.username;
            }
        },
        error => {
            this.errors = error;
        },
        () => {
            if(this.inviteStatus == 'Pending') {
                this.openModal.nativeElement.click();
            }

        })
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