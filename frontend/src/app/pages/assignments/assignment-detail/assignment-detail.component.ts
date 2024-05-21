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
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { FileUploadService } from '../../../shared/service/file-upload.service';
import { FilePathPipe } from '../../../shared/pipes/file-path.pipe';
import { MatDividerModule } from '@angular/material/divider';
import { MatChipsModule } from '@angular/material/chips';
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
    FilePathPipe,
    MatDividerModule,
    MatChipsModule,
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
    private fileUploadService: FileUploadService,
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

  onDownloadFile(filePath: string) {
    const fileName = filePath.split('\\').at(-1);
    this.fileUploadService.downloadFile(fileName as string);
  }

  get student() {
    return this.assignment?.student as User;
  }

  get teacher() {
    return this.assignment?.teacher as User;
  }

  ngOnDestroy(): void {
    const currentUrl = this.router.url;
    this.router.navigate([
      currentUrl.includes('student') ? '/home/student' : '/home/teacher',
    ]);
  }
}
