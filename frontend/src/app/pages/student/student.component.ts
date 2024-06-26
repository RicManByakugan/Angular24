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
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../shared/service/user.service';
import { LoaderComponent } from '../../component/loader/loader.component';
import { User } from '../../interfaces/user.interface';

@Component({
  selector: 'app-student',
  standalone: true,
  imports: [
    AssignmentCardComponent,
    MatPaginatorModule,
    MatIconModule,
    MatButtonModule,
    MatTooltipModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatCardModule,
    LoaderComponent,
  ],
  templateUrl: './student.component.html',
  styleUrl: './student.component.css',
})
export class StudentComponent {
  assignments!: Assignment[];
  userData!: User;
  page = 1;
  pageSize = 12;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;
  searchTerm = '';

  constructor(
    private assignmentService: AssignmentsService,
    public dialog: MatDialog,
    private router: Router,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.userService.getUserConnected().subscribe((resUser) => {
        if (resUser.useractif) {
          this.userData = resUser.useractif;
          if (resUser.useractif.role == 'TEACHER') {
            this.router.navigate(['/home/teacher']);
          }
          this.getAssignments();
        } else {
          this.router.navigate(['/login']);
        }
      });
    });
    this.reloadAssignments();
  }

  reloadAssignments() {
    this.dialog.afterAllClosed.subscribe((event) => {
      this.getAssignments();
    });
  }

  getAssignments() {
    this.assignmentService
      .getAssignmentsPagines({
        page: this.page,
        limit: this.pageSize,
        search: this.searchTerm,
        userId: localStorage.getItem('user') as string,
      })
      .subscribe((value) => {
        this.setValues(value);
      });
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    this.getAssignments();
  }

  search(): void {
    this.assignmentService
      .getAssignmentsPagines({
        page: this.page,
        limit: this.pageSize,
        search: this.searchTerm,
        userId: localStorage.getItem('user') as string,
      })
      .subscribe((value) => {
        this.setValues(value);
      });
  }

  private setValues(value: any) {
    console.log(value.docs);
    this.assignments = value.docs;
    this.totalPages = value.totalPages;
    this.nextPage = value.nextPage;
    this.prevPage = value.prevPage;
    this.hasNextPage = value.hasNextPage;
    this.hasPrevPage = value.hasPrevPage;
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
