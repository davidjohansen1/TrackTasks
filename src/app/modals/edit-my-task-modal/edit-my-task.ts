import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Tasks } from "../../tasks/task";

@Component({
    templateUrl: './edit-my-task.html',
    selector: 'edit-my-task',
    styleUrls: ['./edit-my-task.css']
})
export class EditMyTask {
    constructor(private apiService: ApiService){}

    currentUserId;
    errors;
    task = new Tasks();
    reload;
    @Input() currentTaskId;
    originalStatus;
    @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
    @Output("closeModal") closeModal: EventEmitter<any> = new EventEmitter();

    dropdownitems = ['Not Started', 'In Progress', 'Completed'];
    public selectStatusfields: Object = { text: 'status', value: 'status' };

    ngOnInit() {
        this.apiService.getTask(+this.currentTaskId)
        .subscribe(data => {
            this.reload = 'noReload';
            this.originalStatus = this.task.status
            this.task.id = data.id;
            this.task.name = data.name;
            this.task.description = data.description;
            this.task.status = data.status;
            this.task.assigned_user = data.assigned_user;
            this.task.assignedUser = data.assigned_user;
            this.task.notes = data.notes;
            this.task.available = data.available;
            this.task.owner = data.owner;
        })
    }

    closeCurrentModal() {
        this.closeModal.emit();
    }

    saveTaskChanges() {
        if(this.originalStatus != this.task.status) {
            this.reload = 'reload';
        }
        this.apiService.editTask(this.task)
        .subscribe(data => {
            if(data != 'task updated successfully') {
                alert('There was a problem updating the task');
            }
        },
        error => {
            this.errors = error;
        },
        () => {
            this.closeModal.emit();
            this.reloadComponent.emit(this.reload);
        })
    }
}