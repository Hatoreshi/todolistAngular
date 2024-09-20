import { Component, OnInit, inject } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { Observable } from "rxjs";
import { Store } from '@ngrx/store';
import { TaskService } from "../../services/taskService";
import { Task } from "../../../types";
import { AlertError } from "../UI/Alert/alert.component";
import { MatDialog} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';


interface State {
  count: number;
}


@Component({
  selector: 'todo-list-field',
  standalone: true,
  templateUrl: './todo-list-field.component.html',
  styleUrls: ['./todo-list-field.component.css'],
  imports: [FormsModule, AlertError, MatButtonModule],
})


export class TodoListField implements OnInit {
  dialog = inject(MatDialog);
  count$: Observable<number>;
  task: Task = {
    title: '',
    status: false,
  };
  
  title: string = "";
  status: boolean = false;

  constructor(private store: Store<State>, private taskService: TaskService) {
    this.count$ = this.store.select('count');
  }

  openDialog(message: string) {
    this.dialog.open(AlertError, {
      data: { message },
    });
  }

  ngOnInit(): void {}

  async sendTask(form: NgForm) {
    const taskTitle = form.value.text;

    if (taskTitle === '') {
      this.openDialog('Task cannot be empty!');
    } else {
      this.task.title = taskTitle;
  
      try {
        const response = await this.taskService.addTask(this.task);
        this.title = ''; 
        console.log('Task sent successfully:', response);
      } catch (error) {
        console.error('Error sending task:', error);
      }
    } }
}