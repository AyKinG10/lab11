import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

@Injectable({
  providedIn: 'root'
})
export class WebSocketService {
  private socket$: WebSocketSubject<any>;
  private readonly SERVER_URL = 'ws://localhost:3001';

  constructor() {
    this.socket$ = this.createWebSocket();
  }

  private createWebSocket(): WebSocketSubject<any> {
    return webSocket(this.SERVER_URL);
  }

  sendMessage(message: any): void {
    this.socket$.next(message);
  }

  receiveMessage(): Observable<any> {
    return this.socket$.asObservable();
  }


  updateTaskStatusOnMessage(): Observable<any> {
    return this.socket$.asObservable();
  }
}
