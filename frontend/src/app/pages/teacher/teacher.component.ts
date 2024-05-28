import { Component } from '@angular/core';
import {
  CdkDrag,
  CdkDragDrop,
  CdkDropList,
  CdkDropListGroup,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { MatCardModule } from '@angular/material/card';
import { UserService } from '../../shared/service/user.service';
import { SubjectService } from '../../shared/service/subjects.service';
import { LoaderComponent } from '../../component/loader/loader.component';
import { AssignmentsService } from '../../shared/service/assignments.service';
import { Assignment } from '../../interfaces/assignment.interface';
import {
  MatDialog,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { DialogComponent } from '../../component/dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { AlertComponent } from '../../component/alert/alert.component';
import { CommonModule, DatePipe } from '@angular/common';
import { User } from '../../interfaces/user.interface';
import { AssignmentDetailComponent } from '../assignments/assignment-detail/assignment-detail.component';
import { AssignmentCardComponent } from '../assignments/assignment-card/assignment-card.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDivider } from '@angular/material/divider';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [
    CdkDropListGroup,
    CdkDropList,
    CdkDrag,
    LoaderComponent,
    MatDialogModule,
    AlertComponent,
    AssignmentCardComponent,
    DatePipe,
    CommonModule,
    MatCardModule, MatButtonModule, MatDivider
  ],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css',
})
export class TeacherComponent {
  userData: any;
  subject!: string;
  statusLoading = true;
  dataVide = false;
  allDataSubject: Assignment[] = [];
  dataDone: Assignment[] = [];
  dataNotDone: Assignment[] = [];
  resRequest: string | undefined;

  constructor(
    public dialog: MatDialog,
    private assignmentService: AssignmentsService,
    private userService: UserService,
    private router: Router
  ) { }

  openDialog(
    dataAssignment: Assignment,
    event: CdkDragDrop<Assignment[]>
  ): void {
    this.resRequest = undefined;
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex
    );
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '50vw',
      data: dataAssignment,
    });
    dialogRef.afterClosed().subscribe((Assignmentresult) => {
      if (
        Assignmentresult !== undefined &&
        Assignmentresult.score !== undefined
      ) {
        Assignmentresult.isDone = true;
        Assignmentresult.validationDate = new Date();
        this.assignmentService
          .rendreAssignment(Assignmentresult._id, Assignmentresult)
          .subscribe((resUpdate) => {
            if (resUpdate.message === 'Updated') {
              this.resRequest = 'Assignment rendu';
            } else {
              this.resRequest = resUpdate.message;
            }
          });
      } else {
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex
        );
        this.resRequest = 'Assignment non rendu';
      }
    });
  }

  ngOnInit(): void {
    const userId = localStorage.getItem('user');
    this.assignmentService
      .getAssignmentByUserSubject(userId as string)
      .subscribe((value) => {
        if (value && value.length > 0) {
          this.subject = value[0].subject.type as string;
          this.statusLoading = false;
          this.dataVide = false;
          this.allDataSubject = value;
          this.allDataSubject.map((item) => {
            if (item.isDone) {
              this.dataDone.push(item);
            } else if (!item.isDone) {
              this.dataNotDone.push(item);
            }
          });
        } else {
          this.dataVide = true;
          this.statusLoading = false;
          this.resRequest = 'Aucun assignment trouvé';
        }
      });

    this.userService.getUserConnected().subscribe(resUser => {
      if (resUser.useractif) {
        this.userData = resUser.useractif
        if (resUser.useractif.role == "STUDENT") {
          this.router.navigate(['/home/student']);
        }
      }else{
        this.router.navigate(['/login']);
      }
    })
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      this.openDialog(this.dataNotDone[event.previousIndex], event);
    }
  }

  getStudent(assignment: Assignment) {
    return assignment.student as User;
  }

  viewAssignment(
    assignmentId: string,
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.router.navigate(['/home/teacher'], { queryParams: { assignmentId } });
    this.dialog.open(AssignmentDetailComponent, {
      width: '50vw',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }
}
