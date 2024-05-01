import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { AssignmentOld } from '../assignment.model';
import { AssignmentsService } from '../../../shared/service/assignments.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Assignment } from '../../../interfaces/assignment.interface';

@Component({
  selector: 'app-edit-assignment',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    FormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatButtonModule,
  ],
  templateUrl: './edit-assignment.component.html',
  styleUrl: './edit-assignment.component.css',
})
export class EditAssignmentComponent implements OnInit {
  assignment: Assignment | undefined;
  // Pour les champs de formulaire
  nomAssignment = '';
  dateDeRendu?: Date = undefined;

  constructor(
    private assignmentsService: AssignmentsService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    // on récupère l'id dans l'url
    const id = +this.route.snapshot.params['id'];
    this.assignmentsService.getAssignment(`${id}`).subscribe((assignment) => {
      this.assignment = assignment;
      // on met à jour les champs du formulaire
      if (assignment !== undefined) {
        this.nomAssignment = assignment.title;
        this.dateDeRendu = assignment.creationDate;
      }
    });
  }
}
