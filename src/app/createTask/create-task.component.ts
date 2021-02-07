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

    constructor(private apiService:ApiService, private router:Router) {}

    createTask() {
        console.log(this.task.name)
        console.log(this.task.description)
        this.apiService.addTask(this.task)
        .subscribe(data => {
            console.log(data)
        })
        this.router.navigate(['/dashboard'])
    }

    cancel() {
        this.router.navigate(['/dashboard'])
    }
}