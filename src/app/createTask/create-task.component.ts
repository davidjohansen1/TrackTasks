import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { StudentChildren } from "../tasks/studentchildren";
import { Tasks } from "../tasks/task";

@Component({
    templateUrl: './create-task.component.html'
})
export class CreateTaskComponent implements OnInit {
    studentchildusers: StudentChildren[];
    task = new Tasks();
    errors;

    constructor(private apiService: ApiService, private router: Router) { }

    ngOnInit() {
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                this.studentchildusers = data
                console.log(this.studentchildusers)
            })
    }

    async createTask() {
        await this.apiService.addTask(this.task)
            .subscribe(data => {
                console.log(data)
            },
                error => {
                    this.errors = error;
                },
                () => {
                    this.router.navigate(['/dashboard'])
                })
    }

    cancel() {
        this.router.navigate(['/dashboard'])
    }
}