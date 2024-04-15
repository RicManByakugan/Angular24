import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../shared/service/user.service';
import { LoaderComponent } from '../../../component/loader/loader.component';
import { AssignmentsService } from '../../../shared/service/assignments.service';
import { AssignmentCardComponent } from '../../../component/assignment-card/assignment-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-board',
  standalone: true,
  imports: [LoaderComponent, AssignmentCardComponent, CommonModule],
  templateUrl: './board.component.html',
  styleUrl: './board.component.css'
})
export class BoardComponent implements OnInit {
  userData: any;
  userDataAssignment: any;
  statusLoading: any;

  constructor(private userService: UserService, private assignmentService: AssignmentsService){}

  ngOnInit(): void {
    this.loadData()
  }

  loadData (){
    this.statusLoading = true
    this.userService.getUserConnected().subscribe(user => {
      if (user) {
        this.userData = user.useractif
        this.statusLoading = false
      }
    })
    this.assignmentService.getAssignmentsUser().subscribe(res => {
      if (res) {
        this.userDataAssignment = res
        this.statusLoading = false
      }
    })
  }

}
