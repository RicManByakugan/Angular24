import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Assignment } from '../../../interfaces/assignment.interface';
import { Subject, SubjectType } from '../../../interfaces/subject.interface';
import { User } from '../../../interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterLink } from '@angular/router';
import { SUBJECT_COLORS } from '../../../shared/constants/assignment.constants';
import { AssignmentsService } from '../../../shared/service/assignments.service';
import { AlertComponent } from '../../../component/alert/alert.component';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    RouterLink,
    AlertComponent,
  ],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css',
})
export class AssignmentCardComponent {
  @Input() assignment!: Assignment;
  @Input() user!: User;
  @Output() reload: EventEmitter<void> = new EventEmitter<void>();

  constructor(private assignmentService: AssignmentsService) {}

  subjectColors: Record<SubjectType, string> = SUBJECT_COLORS;
  resRequest!: string;

  get avatarUrl() {
    return (this.assignment.teacher as User)?.photo;
  }

  getSubjectColor(subjectType: SubjectType): string {
    return this.subjectColors[subjectType];
  }

  deleteAssignment(event: Event, assignment: Assignment) {
    event.preventDefault();
    event.stopPropagation();
    this.assignmentService.deleteAssignment(assignment).subscribe((res) => {
      this.resRequest = 'Devoir supprimé';
      this.reload.emit();
    });
  }
}
