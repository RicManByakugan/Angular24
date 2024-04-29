import { Routes } from '@angular/router';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { AddAssignmentComponent } from './pages/assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './pages/assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './pages/assignments/edit-assignment/edit-assignment.component';
import { authGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { BoardComponent } from './pages/user/board/board.component';
import { StudentComponent } from './pages/student/student.component';
import { DahsboardComponent } from './pages/dashboard/dahsboard/dahsboard.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: DahsboardComponent,
    canActivate: [authGuard],
    children: [
      { path: 'assignment/:id', component: AssignmentDetailComponent, canActivate: [authGuard] },
      { path: 'assignment/:id/edit', component: EditAssignmentComponent, canActivate: [authGuard] },
      { path: 'board', component: BoardComponent, canActivate: [authGuard] },
      { path: 'student', component: StudentComponent },
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
