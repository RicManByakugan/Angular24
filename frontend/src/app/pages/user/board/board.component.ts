import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { AssignmentsService } from '../../../shared/service/assignments.service';
import { AssignmentCardComponent } from '../../../component/assignment-card/assignment-card.component';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { SubjectService } from '../../../shared/service/subjects.service';
import { FilePathPipe } from '../../../shared/pipes/file-path.pipe';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [
    LoaderComponent,
    AssignmentCardComponent,
    CommonModule,
    MatCardModule,
    MatGridListModule,
    FilePathPipe,
  ],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css',
})
export class BoardComponent implements OnInit {
  userData: any;
  userDataAssignment: any;
  statusLoading: any;

  constructor(
    private userService: UserService,
    private assignmentService: AssignmentsService,
    private subjectService: SubjectService
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.statusLoading = true;
    this.userService.getUserConnected().subscribe((user) => {
      if (user) {
        this.userData = user.useractif;
        this.statusLoading = false;
      }
    });
  }
}
