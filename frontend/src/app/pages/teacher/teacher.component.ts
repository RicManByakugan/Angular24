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

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatCardModule, LoaderComponent, MatDialogModule],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  userData: any;
  statusLoading: any;
  allDataSubject: Assignment[] = [];
  dataDone: Assignment[] = [];
  dataNotDone: Assignment[] = [];

  constructor(public dialog: MatDialog, private userService: UserService, private subjectService: SubjectService, private assignmentService: AssignmentsService) { }

  openDialog(dataAssignment: Assignment): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      data: dataAssignment,
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }



  ngOnInit(): void {
    this.userService.getUserConnected().subscribe(user => {
      if (user) {
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
    console.log(event.container.data[0]);
    this.openDialog(event.container.data[0])
    if (event.previousContainer === event.container) {
      // moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      // alert("Transfert")

      // alert(event.container.data[0].isDone)
      // alert(event.previousIndex)
      // alert(event.currentIndex)

      // transferArrayItem(
      //   event.previousContainer.data,
      //   event.container.data,
      //   event.previousIndex,
      //   event.currentIndex,
      // );
    }
  }




}
