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
    @Input() newTask;
    @Input() modalName;
    @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
    studentchildusers: StudentChildren[];

    public selectUserfields: Object = { text: 'username', value: 'id' };
    dropdownitems = ['Not Started', 'In Progress', 'Completed'];
    public selectStatusfields: Object = { text: 'status', value: 'status' };

    ngOnInit() {
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                console.log(data)
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

        if(this.newTask) {
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
                        this.reloadComponent.emit();
                    });
        } else {
            this.apiService.editTask(this.task)
            .subscribe(data => {
                if(data === 'task updated successfully') {
                    this.reloadComponent.emit();
                } else {
                    alert('There was a problem updating the task');
                    this.reloadComponent.emit();
                }
            },
            error => {
                this.errors = error;
            },
            () => {
                this.currentAssignedUserId = null;
                this.task.name = null;
                this.task.assignedUser = null;
                this.task.description = null;
                this.task.available = null;
                this.reloadComponent.emit();
            })
        }
    }
}