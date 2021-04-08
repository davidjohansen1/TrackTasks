import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Supervised } from "../tasks/supervised";
import { Tasks } from "../tasks/task";
import { Users } from "../tasks/user";
import { UserToSupervisor } from "../tasks/userToSupervisor";

@Injectable({ providedIn: 'root' })
export class ApiService {
    springUrl: string = "http://localhost:8080/";

    constructor(private http: HttpClient) { }

    getAllTasks(): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.springUrl + 'task/getTasks')
    }

    getUnavailableTasks(loggedInUserId: number): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.springUrl + 'task/getUnavailableTasks?loggedInUserId=' + loggedInUserId)
    }

    getAvailableTasks(loggedInUserId: number): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.springUrl + 'task/getAvailableTasks?loggedInUserId=' + loggedInUserId)
    }

    getAssignedTasks(loggedInUserId: number): Observable<Tasks[]> {
        return this.http.get<Tasks[]>(this.springUrl + 'task/getAssignedTasks?loggedInUserId=' + loggedInUserId)
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

    getSupervised(supervisorId: number): Observable<Supervised[]> {
        return this.http.get<Supervised[]>(this.springUrl + 'user/supervised?supervisorId=' + supervisorId)
    }

    editTask(task: Tasks): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(task)
        return this.http.post(this.springUrl + 'task/editTask', body, { 'headers': headers, responseType: 'text' })
    }

    getUserNotStartTasks(userId: Number): Observable<Tasks[]>{
        const headers = { 'content-type': 'application/json' }
        return this.http.post<Tasks[]>(this.springUrl + 'task/getUserNotStartTasks', userId, { 'headers': headers })
    }

    getUserInProgressTasks(userId: Number): Observable<Tasks[]>{
        const headers = { 'content-type': 'application/json' }
        return this.http.post<Tasks[]>(this.springUrl + 'task/getUserInProgressTasks', userId, { 'headers': headers })
    }

    getUserCompletedTasks(userId: Number): Observable<Tasks[]>{
        const headers = { 'content-type': 'application/json' }
        return this.http.post<Tasks[]>(this.springUrl + 'task/getUserCompletedTasks', userId, { 'headers': headers })
    }

    getTask(taskId: Number): Observable<Tasks>{
        const headers = { 'content-type': 'application/json' }
        return this.http.post<Tasks>(this.springUrl + 'task/getTask', taskId, { 'headers': headers })
    }

    deleteTask(taskId: Number): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        return this.http.delete(this.springUrl + 'task/deleteTask?id=' + taskId, { 'headers': headers, responseType: 'text' })
    }

    findUsers(searchTerm: String, userId: number) : Observable<Users[]> {
        const headers = { 'content-type': 'application/json' }
        return this.http.get<Users[]>(this.springUrl + 'user/findUsers?searchTerm=' + searchTerm + '&userId=' + userId)
    }

    inviteUser(userToSupervisor : UserToSupervisor): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        const body = JSON.stringify(userToSupervisor)
        return this.http.post(this.springUrl + 'user/inviteUser', body, { 'headers': headers, responseType: 'text' })
    }

    getMyUsers(supervisorId: number) {
        const headers = { 'content-type': 'application/json' }
        return this.http.get<Users[]>(this.springUrl + 'user/myUsers?supervisorId=' + supervisorId)
    }

    checkInvitations(userId: number) {
        const headers = { 'content-type': 'application/json' }
        return this.http.get<Users>(this.springUrl + 'user/checkInvitations?userId=' + userId)
    }

    inviteResponse(inviteId: number, userId: number, supervisorId: number, status: string): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        return this.http.post(this.springUrl + 'user/inviteResponse?inviteId=' + inviteId + '&userId=' + userId + '&supervisorId=' + supervisorId + '&status=' + status,
                            '', { 'headers': headers, responseType: 'text' })
    }

    deleteUserToSupervisor(userToSupervisorId: Number): Observable<any> {
        const headers = { 'content-type': 'application/json' }
        return this.http.delete(this.springUrl + 'user/deleteUserToSupervisor?userToSupId=' + userToSupervisorId, { 'headers': headers, responseType: 'text' })
    }

    getUserTasksBySupervisor(loggedInUserId: Number, taskUserId: Number): Observable<Tasks[]>{
        const headers = { 'content-type': 'application/json' }
        return this.http.get<Tasks[]>(this.springUrl + 'task/getUserTasksBySupervisor?loggedInUserId=' + loggedInUserId + '&taskUserId=' + taskUserId, { 'headers': headers })
    }
}