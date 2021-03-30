import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Tasks } from "../../tasks/task";

@Component({
    templateUrl: './newTask.component.html',
    selector: 'newTask',
    styleUrls: ['./newTask.component.css']
})
export class NewTask {
    constructor(private apiService: ApiService){}

    errors;
    task = new Tasks();
    possibleOwners = [];
    @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
    @Output("closeModal") closeModal: EventEmitter<any> = new EventEmitter();
    @Input() studentChildren;

    public selectUserfields: Object = { text: 'username', value: 'id' };
    public selectOwer: Object = { text: 'username', value: 'id' };

    ngOnInit() {
        this.studentChildren.forEach(user => {
            this.possibleOwners.push(user);
        });
        this.possibleOwners.push({"id":+localStorage.getItem('userId'), "username":localStorage.getItem('userName')})
        this.task.owner = +localStorage.getItem('userId');
     }

    closeCurrentModal() {
        this.closeModal.emit();
    }

    saveTask() {
        this.task.notes = null;
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
                this.closeModal.emit();
                this.reloadComponent.emit();
            });

    }
}