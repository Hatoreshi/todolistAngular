import {Component, inject, model, signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { ITask } from '../../../../types';


@Component({
  selector: 'modal-edit-task',
  templateUrl: 'modal-edit-task.component.html',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
})

export class ModalEditTask {
  readonly dialogRef = inject(MatDialogRef<ModalEditTask>);
  readonly data = inject<ITask>(MAT_DIALOG_DATA);
  title = this.data.title;

  onNoClick(): void {
    this.dialogRef.close();
  }
}