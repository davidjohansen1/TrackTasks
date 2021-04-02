import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Tasks } from "../../tasks/task";

@Component({
    templateUrl: './edit-task.component.html',
    selector: 'edit-task',
    styleUrls: ['./edit-task.component.css']
})
export class EditTask {
    constructor(private apiService: ApiService){}

    errors;
    task = new Tasks();
    readloadSibling;
    originalAvailable;
    originalUser;
    @Input() currentTaskId
    @Input() supervised
    @Input() possibleOwners
    @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
    @Output("closeModal") closeModal: EventEmitter<any> = new EventEmitter();

    public selectUserfields: Object = { text: 'username', value: 'id' };
    public selectOwer: Object = { text: 'username', value: 'id' };

    ngOnInit() {
        this.apiService.getTask(+this.currentTaskId)
        .subscribe(data => {
            this.readloadSibling = '';
            this.task.id = data.id;
            this.task.name = data.name;
            this.task.description = data.description;
            this.task.status = data.status;
            this.task.assigned_user = data.assigned_user;
            this.task.assignedUser = this.task.assigned_user;
            this.originalUser = this.task.assignedUser;
            this.task.username = data.username;
            this.task.available = data.available;
            this.originalAvailable = this.task.available;
            this.task.status = data.status;
            this.task.owner = data.owner;
        })
    }

    closeCurrentModal() {
        this.closeModal.emit();
    }

    saveTaskChanges() {
        // Available is checked so it moves to available. Need to reload the available column
        if(!this.originalAvailable && this.task.available) {
            this.readloadSibling = 'reloadAvailable'
        }
        // User is assgined to a task. Need to reload assigned column
        if(this.originalUser === 0 && this.task.assignedUser != 0) {
            this.task.available = true;
            this.readloadSibling = 'reloadAssigned'
        }
        // User is changed to unassigned. Need to reload available column
        if(this.originalUser != 0 && this.task.assignedUser === 0) {
            this.readloadSibling = 'reloadAvailable'
        }
        // Available is unchecked so it moves to unavailable. Need to reload the unavailable column
        if(this.originalAvailable && !this.task.available) {
            this.task.assignedUser = 0;
            this.readloadSibling = 'reloadUnavailable'
        }

        this.apiService.editTask(this.task)
            .subscribe(data => {
            },
            error => {
                this.errors = error;
            },
            () => {
                this.closeModal.emit();
                this.reloadComponent.emit(this.readloadSibling);
            });
        }
}