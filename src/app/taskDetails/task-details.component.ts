import { Component, Input } from "@angular/core";

@Component({
    templateUrl: './task-details.component.html',
    selector: 'task-details'
})
export class TaskDetailsComponent {
    @Input() currentTaskId
    @Input() currentTaskName;
    @Input() currentTaskDesc;
}