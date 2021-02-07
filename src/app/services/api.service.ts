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
        return this.http.get<Tasks[]>(this.springUrl + 'task/tasks')
    }

    addTask(task:Tasks): Observable<any> {
        const headers = {'content-type': 'application/json'}
        const body=JSON.stringify(task)
        console.log(task)
        return this.http.post(this.springUrl + 'task/createTask', body, {'headers':headers, responseType: 'text'})
    }

    createUser(user:Users): Observable<any> {
        const headers = { 'content-type': 'application/json'}
        const body=JSON.stringify(user)
        return this.http.post(this.springUrl + 'user/create', body, {'headers':headers, responseType: 'text'})
    }

    authenticateUser(user:Users): Observable<any> {
        const headers = { 'content-type': 'application/json'}
        const body=JSON.stringify(user)
        return this.http.post(this.springUrl + 'user/authenticate', body, {'headers':headers})
    }
}