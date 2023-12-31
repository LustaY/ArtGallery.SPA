import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class LogService {
  logs: string[] = [];

  add(message: string) {
    this.logs.push(message);
  }

  clear() {
    this.logs = [];
  }
}