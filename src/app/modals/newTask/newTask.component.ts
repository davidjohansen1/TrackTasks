import { Component, EventEmitter, Input, Output } from "@angular/core";
import { ApiService } from "../../services/api.service";
import { Tasks } from "../../tasks/task";
declare var $: any;

@Component({
    templateUrl: './newTask.component.html',
    selector: 'newTask',
    styleUrls: ['./newTask.component.css']
})
export class NewTask {
    constructor(private apiService: ApiService){}

    errors;
    task = new Tasks();
    loggedInUser;
    @Output("reloadComponent") reloadComponent: EventEmitter<any> = new EventEmitter();
    @Output("closeModal") closeModal: EventEmitter<any> = new EventEmitter();
    @Input() supervised;
    @Input() possibleOwners;

    public selectUserfields: Object = { text: 'username', value: 'id' };
    public selectOwer: Object = { text: 'username', value: 'id' };

    ngOnInit() {
        this.task.owner = +localStorage.getItem('userId');
        this.loggedInUser = localStorage.getItem('userId');
     }

    closeCurrentModal() {
        this.closeModal.emit();
    }

    saveTask() {
        if(this.task.owner != +this.loggedInUser) {
            var response = confirm("Are you sure you want this task to be owned by someone other than yourself?")
            if(response == true) {
                $('#newTask').modal('toggle');
            } else {
                return
            }
        }

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
                $('#newTask').modal('toggle');
                this.closeModal.emit();
                this.reloadComponent.emit();
            });

    }
}