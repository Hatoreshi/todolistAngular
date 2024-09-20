import { Component, OnInit, ChangeDetectionStrategy, inject } from "@angular/core";
import { Store } from '@ngrx/store';
import { Observable, firstValueFrom } from "rxjs";
import { TaskService } from "../../services/taskService";
import { CommonModule } from "@angular/common";
import { ITask } from "../../../types";
import { ModalEditTask } from "../UI/Modal/modal-edit-task.component";
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';

interface State {
    count: number;
}

@Component({
    selector: 'todo-list-item',
    standalone: true,
    templateUrl: './todo-list-item.component.html',
    styleUrls: ['./todo-list-item.component.css'],
    imports: [CommonModule, MatFormFieldModule, MatInputModule, FormsModule, ModalEditTask, MatButtonModule],
    changeDetection: ChangeDetectionStrategy.OnPush,
})

export class TodoListItem implements OnInit {
    count$: Observable<number>;
    tasks$: Observable<ITask[]>;
    title = ('');
    readonly dialog = inject(MatDialog);

    constructor(private store: Store<State>, private taskService: TaskService) {
        this.count$ = this.store.select('count');
        this.tasks$ = this.taskService.tasks$;
    }

    async getTaskById(id: string): Promise<ITask | undefined> {
        try {
            const tasks = await firstValueFrom(this.tasks$);
            return tasks.find(task => task._id === id);
        } catch (error) {
            console.error('Error finding task:', error);
            return undefined;
        }
    }

    ngOnInit(): void {
        this.fetchTasks();
    }


    fetchTasks() {
        this.taskService.getTasks();
    }

    deleteTask(id: string) {
        this.taskService.deleteTask(id);
    }

    async editTask( task: ITask) {
        await this.taskService.editTask(task._id, task);
        this.fetchTasks();
    }

    async toggleTaskStatus(id: string, status: boolean) {
        try {
            const tasks = await firstValueFrom(this.tasks$);
            const taskToUpdate = tasks.find(task => task._id === id);
    
            if (taskToUpdate) {
                const updatedTask: ITask = {
                    ...taskToUpdate,
                    status
                };
                await this.taskService.editTask(id, updatedTask);
                this.fetchTasks(); 
            }
        } catch (error) {
            console.error('Error toggling task status:', error);
        }
    }

    onCheckboxChange(id: string, event: Event) {
        const input = event.target as HTMLInputElement;
        const newStatus = input.checked;
        this.toggleTaskStatus(id, newStatus);
    }
    
    async openDialog(task: ITask) {
    const dialogRef = this.dialog.open(ModalEditTask, {
      data: { title: this.title},
    });
    const tasks = await firstValueFrom(this.tasks$);
    const taskToUpdate = tasks.find(task => task._id === task._id);


    dialogRef.afterClosed().subscribe(result => {
      if (result !== undefined) {
        if (task._id) {
            const updatedTask: ITask = {
              ...task,
              title: result
            };
            this.editTask(updatedTask);
          }
      }
    }); 
}
}