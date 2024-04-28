import { Component } from '@angular/core';
import { Assignment } from '../../interfaces/assignment.interface';
import { AssignmentCardComponent } from '../assignments/assignment-card/assignment-card.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsService } from '../../shared/service/assignments.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    AssignmentCardComponent,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  assignments!: Assignment[];
  page = 1;
  pageSize = 12;

  constructor(private assignmentService: AssignmentsService) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService
      .getAssignmentsPagines(this.page, this.pageSize)
      .subscribe((value) => {
        console.log(value);
        this.assignments = value.docs;
      });
  }
}
