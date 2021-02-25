import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { StudentChildren } from "../tasks/studentchildren";
import { Tasks } from "../tasks/task";

@Component({
    templateUrl: './create-task.component.html',
    selector: 'create-task'
})
export class CreateTaskComponent implements OnInit {
    studentchildusers: StudentChildren[];
    task = new Tasks();
    errors;
    @Output("loadAvailableTasksComponent") loadAvailableTasksComponent: EventEmitter<any> = new EventEmitter();

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                this.studentchildusers = data
            })
    }

    async createTask() {
        await this.apiService.addTask(this.task)
            .subscribe(data => {
            },
            error => {
                this.errors = error;
            },
            () => {
                this.loadAvailableTasksComponent.emit();
            })
    }

    cancel() {
        this.loadAvailableTasksComponent.emit();
    }

    public fields: Object = { text: 'username', value: 'id' };
}