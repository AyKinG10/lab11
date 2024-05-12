import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from './task.model';
import { WebSocketService } from './web-socket.service';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3001/api/tasks';

  constructor(private http: HttpClient, private webSocketService: WebSocketService) {}

  // Метод для получения задач с сервера
  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }


  createTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  updateTask(id: string, task: Task): Observable<Task> {
    return this.http.patch<Task>(`${this.apiUrl}/${id}`, task);
  }

  deleteTask(id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }


  sendTaskStatusUpdate(taskId: string, status: string): void {
    const message = { taskId, status };
    this.webSocketService.sendMessage(message);
  }

  updateTaskStatusOnMessage(): Observable<any> {
    return this.webSocketService.updateTaskStatusOnMessage();
  }
}
