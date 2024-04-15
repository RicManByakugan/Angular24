import { Component, Input } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { Assignment } from '../../pages/assignments/assignment.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-assignment-card',
  standalone: true,
  imports: [MatCardModule, CommonModule],
  templateUrl: './assignment-card.component.html',
  styleUrl: './assignment-card.component.css'
})
export class AssignmentCardComponent {
  @Input()
  dataItem: Assignment | undefined


}
