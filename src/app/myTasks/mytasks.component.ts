import { Component, OnInit, Output } from "@angular/core";
import { ApiService } from "../services/api.service";

@Component({
    selector: 'mytasks',
    templateUrl: './mytasks.component.html',
    styleUrls: ['mytasks.component.css']
})
export class MyTasks {
    constructor(private apiService: ApiService) { }
    @Output() notStartedRefresh;
    @Output() inProcessRefresh;
    @Output() completedRefresh;

    reloadNotStarted() { 
        this.notStartedRefresh = !this.notStartedRefresh;
    }

    reloadinProcess() { 
        this.inProcessRefresh = !this.inProcessRefresh;
    }

    reloadCompleted() { 
        this.completedRefresh = !this.completedRefresh;
    }
}