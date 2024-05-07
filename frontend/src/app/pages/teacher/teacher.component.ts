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
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../component/dialog/dialog.component';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/service/auth.service';
import { AlertComponent } from '../../component/alert/alert.component';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatCardModule, LoaderComponent, MatDialogModule, AlertComponent, DatePipe],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  userData: any;
  statusLoading: any;
  allDataSubject: Assignment[] = [];
  dataDone: Assignment[] = [];
  dataNotDone: Assignment[] = [];
  resRequest: string | undefined;

  constructor(public dialog: MatDialog, private userService: UserService, private authService: AuthService, private subjectService: SubjectService, private assignmentService: AssignmentsService, private route: Router) { }

  openDialog(dataAssignment: Assignment, event: CdkDragDrop<Assignment[]>): void {
    this.resRequest = undefined;
    transferArrayItem(
      event.previousContainer.data,
      event.container.data,
      event.previousIndex,
      event.currentIndex,
    );
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dataAssignment,
    });
    dialogRef.afterClosed().subscribe(Assignmentresult => {
      if (Assignmentresult !== undefined && Assignmentresult.isDone !== undefined) {
        console.log(Assignmentresult._id);
        this.assignmentService.rendreAssignment(Assignmentresult._id, Assignmentresult)
          .subscribe(resUpdate => {
            if(resUpdate.message === "Updated"){
              this.resRequest = "Assignment rendu"     
            }else{
              this.resRequest = resUpdate.message     
            }
          })   
      } else {
        transferArrayItem(
          event.container.data,
          event.previousContainer.data,
          event.currentIndex,
          event.previousIndex,
        );
        this.resRequest = "Assignment non rendu" 
      }
    });
  }

  ngOnInit(): void {
    this.userService.getUserConnected().subscribe(user => {
      this.resRequest = undefined;
      if (user.message === "Invalid token" || user.message === "Utilisateur invalide") {
        this.authService.logOut();
        this.route.navigate(['/login']);
        this.resRequest = "Veuiller vous reconnectez" 
      } else {
        this.userData = user.useractif
        this.subjectService.getSubject(this.userData.subject).subscribe(res => {
          if (res) {
            this.userData.subject = res
            this.assignmentService.getAssignmentsSubject(this.userData.subject.type)
              .subscribe(resData => {
                if (resData) {
                  this.statusLoading = false
                  this.allDataSubject = resData
                  this.allDataSubject.map(item => {
                    if (item.isDone) {
                      this.dataDone.push(item)
                    } else if (!item.isDone) {
                      this.dataNotDone.push(item)
                    }
                  })
                }
              })
          }
        })
      }
    })
  }

  drop(event: CdkDragDrop<Assignment[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      this.openDialog(this.dataNotDone[event.previousIndex], event)
    }
  }

}
