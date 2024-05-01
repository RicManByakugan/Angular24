import { Component } from '@angular/core';
import { Assignment } from '../../interfaces/assignment.interface';
import { AssignmentCardComponent } from '../assignments/assignment-card/assignment-card.component';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatIconModule } from '@angular/material/icon';
import { AssignmentsService } from '../../shared/service/assignments.service';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatDialog } from '@angular/material/dialog';

import { AddAssignmentComponent } from '../assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from '../assignments/assignment-detail/assignment-detail.component';
import { Router } from '@angular/router';

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
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  constructor(
    private assignmentService: AssignmentsService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.getAssignments();
  }

  getAssignments() {
    this.assignmentService
      .getAssignmentsPagines(this.page, this.pageSize)
      .subscribe((value) => {
        this.assignments = value.docs;
        this.totalPages = value.totalPages;
        this.nextPage = value.nextPage;
        this.prevPage = value.prevPage;
        this.hasNextPage = value.hasNextPage;
        this.hasPrevPage = value.hasPrevPage;
      });
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAssignments();
  }

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddAssignmentComponent, {
      width: '60vw',
      height: '50vh',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  viewAssignment(
    assignmentId: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.router.navigate(['/home/student'], { queryParams: { assignmentId } });
    this.dialog.open(AssignmentDetailComponent, {
      width: '50vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
