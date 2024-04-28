import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatCardModule } from '@angular/material/card';
import { Assignment } from '../../../interfaces/assignment.interface';
import { Subject } from '../../../interfaces/subject.interface';
import { User } from '../../../interfaces/user.interface';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [MatCardModule, MatIconModule, CommonModule],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css',
})
export class AssignmentCardComponent {
  @Input() assignment!: Assignment;

  get avatarUrl() {
    return (this.assignment.teacher as User)?.photo;
  }
}
