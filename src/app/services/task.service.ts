import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';

const baseUrl = 'https://localhost:8000/api/Tasks';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient) { }
  getAll(): Observable<Task[]> {
    return this.http.get<Task[]>(baseUrl);
  }

  get(id: any): Observable<Task> {
    return this.http.get<Task>(`${baseUrl}/${id}`);
  }

  create(data: any): Observable<any> {
    return this.http.post(baseUrl, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }

  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

  findByDescription(description: any): Observable<Task[]> {
    return this.http.get<Task[]>(`${baseUrl}?description=${description}`);
  }

}
