import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { StudentChildren } from "../tasks/studentchildren";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";

@Injectable({ providedIn: 'root' })
export class ApiService {
    springUrl: string = "http://localhost:8080/";

    constructor(private http: HttpClient) { }

    getAvailableTasks(): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.springUrl + 'task/availableTasks')
    }

    getUnAvailableTasks(): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.springUrl + 'task/unAvailableTasks')
    }

    addTask(task: Tasks): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(task)
        return this.http.post(this.springUrl + 'task/createTask', body, { 'headers': headers, responseType: 'text' })
    }

    createUser(user: Users): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user)
        return this.http.post(this.springUrl + 'user/create', body, { 'headers': headers, responseType: 'text' })
    }

    authenticateUser(user: Users): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(user)
        return this.http.post(this.springUrl + 'user/authenticate', body, { 'headers': headers })
    }

    getStudentChildUsers(): Observable<StudentChildren[]> {
        return this.http.get<StudentChildren[]>(this.springUrl + 'user/studentchildusers')
    }

    editTask(task: Tasks): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(task)
        return this.http.post(this.springUrl + 'task/editTask', body, { 'headers': headers, responseType: 'text' })
    }

    getUserTasks(userId: Number): Observable<Tasks[]>{
        const headers = { 'content-type': 'application/json' }
        console.log(userId)
        return this.http.post<Tasks[]>(this.springUrl + 'task/getUserTasks', userId, { 'headers': headers })
    }
}