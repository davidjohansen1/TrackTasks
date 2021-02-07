import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { ApiService } from "../services/api.service";
import { Tasks } from "../tasks/task";

@Component({
    templateUrl: './create-task.component.html'
})
export class CreateTaskComponent {
    allTasks:Tasks[];
    task = new Tasks();
    errors;

    constructor(private apiService:ApiService, private router:Router) {}

    async createTask() {
        console.log(this.task.name)
        console.log(this.task.description)
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