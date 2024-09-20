import { Injectable } from '@angular/core';
import axios from 'axios';
import { BehaviorSubject } from 'rxjs';
import { ITask, Task } from '../../types';

@Injectable({
  providedIn: 'root'
})

export class TaskService {
  private apiUrl = 'http://localhost:8000/tasks';
  private tasksSubject = new BehaviorSubject<ITask[]>([]);
  tasks$ = this.tasksSubject.asObservable();

  async addTask(task: Task) {
    try {
      const response = await axios.post(this.apiUrl, task);
      await this.getTasks();
      return response.data;
    } catch (error) {
      console.error('Error sending task:', error);
      throw error;
    }
  }

  async getTasks() {
    try {
      const response = await axios.get(this.apiUrl);
      this.tasksSubject.next(response.data);
      return response.data;
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  }

  async deleteTask(taskId: string) {
    try {
      const response = await axios.delete(`${this.apiUrl}/${taskId}`);
      this.getTasks(); 
      return response.data;
    } catch (error) {
      console.error('Error getting tasks:', error);
      throw error;
    }
  }

  async editTask(taskId: string, task: ITask) {
    try {
      const response = await axios.put(`${this.apiUrl}/${taskId}`, task);
      await this.getTasks(); 
      return response.data;
    } catch (error) {
      console.error('Error editing task:', error);
      throw error;
    }
  }
}