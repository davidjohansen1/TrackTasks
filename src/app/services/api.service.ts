import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";

@Injectable({providedIn: 'root'})
export class ApiService {
    baseUrl: string = "http://localhost:3000/";
    springUrl: string = "http://localhost:8080/";

    constructor(private http: HttpClient) {}

    getTasks(): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.baseUrl + 'tasks')
    }

    addTask(task:Tasks): Observable<any> {
        const headers = { 'content-type': 'application/json'}
        const body=JSON.stringify(task)
        console.log(task)
        return this.http.post(this.baseUrl + 'tasks', body, {'headers':headers})
    }

    createUser(user:Users): Observable<any> {
        const headers = { 'content-type': 'application/json'}
        const body=JSON.stringify(user)
        return this.http.post(this.springUrl + 'user/create', body, {'headers':headers})
    }
}