import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatChipsModule } from '@angular/material/chips';
import { provideNativeDateAdapter } from '@angular/material/core';

import { AssignmentsService } from '../../../shared/service/assignments.service';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { Assignment } from '../../../interfaces/assignment.interface';
import { Subject } from '../../../interfaces/subject.interface';
import { EMTPY_ASSIGNMENT } from '../../../shared/constants/assignment.constants';
import { SubjectService } from '../../../shared/service/subjects.service';
import { MatIconModule } from '@angular/material/icon';
import { FileUploadService } from '../../../shared/service/file-upload.service';

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
    MatIconModule,
    MatChipsModule,
  ],
  templateUrl: './add-assignment.component.html',
  styleUrl: './add-assignment.component.css',
})
export class AddAssignmentComponent {
  // champs du formulaire
  newAssignment!: Assignment;
  subjects!: Subject[];
  @ViewChild('fileUpload')
  fileUpload!: ElementRef;

  uploadedFile!: File | null;

  constructor(
    private assignmentsService: AssignmentsService,
    public dialogRef: MatDialogRef<AddAssignmentComponent>,
    private subjectService: SubjectService,
    private fileUploadService: FileUploadService
  ) {}

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.newAssignment = EMTPY_ASSIGNMENT;
    this.getSubjects();
  }

  onSubmit(event: any) {
    this.newAssignment.creationDate = new Date();
    this.newAssignment.student = localStorage.getItem('user') as string;
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

  onClick(event: any) {
    if (this.fileUpload) this.fileUpload.nativeElement.click();
  }

  onFileSelected(event: any) {
    this.uploadedFile = event.target.files[0] as File;
    this.fileUploadService.upload([this.uploadedFile]).subscribe((value) => {
      this.newAssignment.file = value.body;
    });
  }

  onClearFile() {
    this.uploadedFile = null;
    this.fileUpload.nativeElement.target.files = [];
  }
}
