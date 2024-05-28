import { Component, Input } from '@angular/core';
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

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [
    MatCardModule,
    MatIconModule,
    CommonModule,
    MatTooltipModule,
    RouterLink,
  ],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css',
})
export class AssignmentCardComponent {
  @Input() assignment!: Assignment;

  subjectColors: Record<SubjectType, string> = SUBJECT_COLORS;

  get avatarUrl() {
    return (this.assignment.teacher as User)?.photo;
  }

  getSubjectColor(subjectType: SubjectType): string {
    return this.subjectColors[subjectType];
  }
}
