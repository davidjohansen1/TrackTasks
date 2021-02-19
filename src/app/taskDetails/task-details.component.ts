import { Component, Input } from "@angular/core";

@Component({
    templateUrl: './task-details.component.html',
    selector: 'task-details',
    styleUrls: ['./task-details.component.css']
})
export class TaskDetailsComponent {
    @Input() currentTaskId
    @Input() currentTaskName;
    @Input() currentTaskDesc;
}