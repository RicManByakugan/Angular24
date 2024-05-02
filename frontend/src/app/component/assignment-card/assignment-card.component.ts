import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { AssignmentOld } from '../../pages/assignments/assignment.model';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [MatCardModule, CommonModule, DatePipe],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css',
})
export class AssignmentCardComponent {
  @Input()
  dataItem: AssignmentOld | undefined;
}
