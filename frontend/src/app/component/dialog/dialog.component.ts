import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatDialogActions, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { Assignment } from '../../interfaces/assignment.interface';

@Component({
  selector: 'app-dialog',
  standalone: true,
  imports: [MatDialogTitle,MatDialogContent,MatDialogActions, MatFormFieldModule, FormsModule],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.css'
})
export class DialogComponent {
  @Input()
  data: Assignment | any;

  constructor(public dialogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

}
