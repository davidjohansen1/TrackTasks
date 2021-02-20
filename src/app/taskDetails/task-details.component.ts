import { Component, Input } from "@angular/core";
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

    studentchildusers: StudentChildren[];
    public fields: Object = { text: 'username', value: 'id' };
    task = new Tasks();
    @Input() currentTaskId
    @Input() currentTaskName;
    @Input() currentTaskDesc;
    @Input() currentUsername;
    @Input() currentAssignedUserId;

    ngOnInit() {
        this.apiService.getStudentChildUsers()
            .subscribe(data => {
                this.studentchildusers = data
            })
    }


    editTask() {
        this.task.id = this.currentTaskId;

        if(this.task.name === undefined) {
            this.task.name = this.currentTaskName
        }
        if(this.task.description === undefined) {
            this.task.description = this.currentTaskDesc
        }
        if(this.task.assignedUser === undefined) {
            this.task.assignedUser = this.currentAssignedUserId
        }

        console.log(this.task.name)
        console.log(this.task.description)
        console.log(this.task.assignedUser)

        this.apiService.editTask(this.task)
            .subscribe(data => {
                if(data === 'task updated successfully') {
                    setTimeout(() => {  window.location.reload(); }, 1000);
                } else {
                    alert('There was a problem updating the task');
                }
            })
        
    }
}