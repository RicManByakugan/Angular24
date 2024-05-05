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

@Component({
  selector: 'app-teacher',
  standalone: true,
  imports: [CdkDropListGroup, CdkDropList, CdkDrag, MatCardModule, LoaderComponent],
  templateUrl: './teacher.component.html',
  styleUrl: './teacher.component.css'
})
export class TeacherComponent {
  userData: any;
  statusLoading: any;
  allDataSubject: Assignment[] = [];;

  items = ['Carrots', 'Tomatoes', 'Onions', 'Apples', 'Avocados'];

  basket = ['Oranges', 'Bananas', 'Cucumbers'];

  constructor(private userService: UserService, private subjectService: SubjectService, private assignmentService: AssignmentsService){}
  
  ngOnInit(): void{
    this.userService.getUserConnected().subscribe(user => {
      if (user) {
        this.userData = user.useractif
        this.subjectService.getSubject(this.userData.subject).subscribe(res => {
          if(res){
            this.userData.subject = res
            this.assignmentService.getAssignmentsSubject(this.userData.subject.type)
              .subscribe(resData => {
                if(resData){
                  this.statusLoading = false
                  this.allDataSubject = resData
                }
              })
          }
        })
      }
    })

  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      // alert("Transfert")
      // alert(event.container.data)
      // alert(event.previousIndex)
      // alert(event.currentIndex)
    }
  }

  


}
