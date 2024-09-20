import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TodoListField } from '../TodoField/todo-list-field.component';
import { FormsModule, NgForm } from '@angular/forms';
import { TodoListItem } from "../TodoItem/todo-list-item.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, TodoListField, FormsModule, TodoListItem],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})

export class AppComponent  {
  title = 'todolist-angular';
}

