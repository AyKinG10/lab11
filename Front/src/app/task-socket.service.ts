// task-socket.service.ts

import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskSocketService {
  private socket: Socket;

  constructor() {
    this.socket = io('https://46.34.146.222'); // Используйте ваш внешний IP-адрес
  }


  // Method to listen for task status updates
  onUpdateTaskStatus(): Observable<{ taskId: string, newStatus: string }> {
    return new Observable(observer => {
      this.socket.on('taskStatusUpdated', (taskId: string, newStatus: string) => {
        observer.next({ taskId, newStatus });
      });
    });
  }

  // Method to send task status updates to the server
  updateTaskStatus(taskId: string, newStatus: string): void {
    this.socket.emit('updateTaskStatus', taskId, newStatus);
  }
}
