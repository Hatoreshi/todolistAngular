import { Component, inject } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogTitle,
  MatDialogContent,
} from '@angular/material/dialog';

@Component({
  selector: 'alert-error',
  templateUrl: 'alert.component.html',
  standalone: true,
  imports: [MatDialogTitle, MatDialogContent],
})

export class AlertError {
  data = inject(MAT_DIALOG_DATA);
}