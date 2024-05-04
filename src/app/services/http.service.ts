import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HttpService {
  httpClient = inject(HttpClient);
  constructor() {}

  addTask(task: string) {
    return this.httpClient.post('http://localhost:3000/tasks', {
      title: task,
    });
  }
  getAllTasks() {
    return this.httpClient.get('http://localhost:3000/tasks');
  }
  updateTask(task: any) {
    return this.httpClient.put('http://localhost:3000/tasks/' + task.id, task);
  }
}
