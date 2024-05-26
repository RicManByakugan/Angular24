import { Component, NgZone, ViewChild } from '@angular/core';
import { AssignmentOld } from '../assignments/assignment.model';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { AssignmentsService } from '../../shared/service/assignments.service';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { AssignmentCardComponent } from '../assignments/assignment-card/assignment-card.component';
import { Criteria } from '../../interfaces/criteria.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatListModule,
    MatSliderModule,
    AssignmentCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
}
