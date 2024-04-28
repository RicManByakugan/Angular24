import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AssignmentsService } from '../../../shared/service/assignments.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Assignment } from '../../../interfaces/assignment.interface';
import { Subject } from '../../../interfaces/subject.interface';
import { EMTPY_ASSIGNMENT } from '../../../shared/constants/assignment.constants';
import { SubjectService } from '../../../shared/service/subjects.service';

@Component({
  selector: 'app-add-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  // champs du formulaire
  newAssignment: Assignment = EMTPY_ASSIGNMENT;
  subjects!: Subject[];

  constructor(
    private assignmentsService: AssignmentsService,
    public dialogRef: MatDialogRef<AddAssignmentComponent>,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.getSubjects();
  }

  onSubmit(event: any) {
    this.assignmentsService
      .addAssignment(this.newAssignment)
      .subscribe((reponse) => {
        console.log(reponse);
      });
  }

  getSubjects() {
    this.subjectService.getSubjects().subscribe((value) => {
      this.subjects = value;
    });
  }
}
