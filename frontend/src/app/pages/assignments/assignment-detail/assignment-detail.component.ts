import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { AssignmentOld } from '../assignment.model';
import { AssignmentsService } from '../../../shared/service/assignments.service';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../shared/service/auth.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Assignment } from '../../../interfaces/assignment.interface';
import { User } from '../../../interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-assignment-detail',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatIconModule,
  ],
  templateUrl: './assignment-detail.component.html',
  styleUrl: './assignment-detail.component.css',
})
export class AssignmentDetailComponent implements OnInit {
  assignment!: Assignment | undefined;
  assignmentId!: string;

  constructor(
    private assignmentsService: AssignmentsService,
    public dialogRef: MatDialogRef<AssignmentDetailComponent>,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getAssignmentId();
    this.getAssignment();
  }

  getAssignmentId() {
    this.route.queryParams.subscribe((params) => {
      this.assignmentId = params['assignmentId'];
    });
  }

  getAssignment() {
    this.assignmentsService
      .getAssignment(this.assignmentId)
      .subscribe((value) => {
        this.assignment = value;
      });
  }

  get student() {
    return this.assignment?.student as User;
  }

  get teacher() {
    return this.assignment?.teacher as User;
  }

  ngOnDestroy(): void {
    this.router.navigate(['/home/student']);
  }
}
