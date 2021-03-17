import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiService } from "../services/api.service";
import { StudentChildren } from "../tasks/studentchildren";
import { Tasks } from "../tasks/task";

@Component({
    templateUrl: './task-details.component.html',
    selector: 'task-details',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
    constructor(private apiService: ApiService){}

    errors;
    task = new Tasks();
    @Input() currentTaskId
    @Input() currentTaskName;
    @Input() currentTaskDesc;
    @Input() currentUsername;
    @Input() currentAssignedUserId;
    @Input() currentTaskAvailability;
    @Input() currentStatus;
    @Input() fromMyTasks;
    @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
    studentchildusers: StudentChildren[];

    public selectUserfields: Object = { text: 'username', value: 'id' };
    dropdownitems = ['Not Started', 'In Progress', 'Completed'];
    public selectStatusfields: Object = { text: 'status', value: 'status' };

    ngOnInit() {
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                this.studentchildusers = data
            })
    }

    checkValues() {
        this.task.id = this.currentTaskId;
        this.task.name = this.currentTaskName
        this.task.description = this.currentTaskDesc
        this.task.assignedUser = this.currentAssignedUserId
        this.task.available = this.currentTaskAvailability
        this.task.username = this.currentUsername
    }

    cancel() {
        this.currentAssignedUserId = this.task.assignedUser;
        this.reloadComponent.emit();
    }

    saveTaskChanges() {
        this.checkValues();

        if(this.task.assignedUser) {
            this.task.available = true;
        }
        this.apiService.addTask(this.task)
            .subscribe(data => {
            },
            error => {
                this.errors = error;
            },
            () => {
                this.currentTaskName = null;
                this.currentAssignedUserId = null;
                this.currentTaskDesc = null;
                this.currentTaskAvailability= null;
                this.task.id = null;
                this.task.name = null;
                this.task.description = null;
                this.task.assignedUser = null;
                this.task.available = null;
                this.task.username = null;
                this.reloadComponent.emit();
            });

    }
}