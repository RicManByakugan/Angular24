import { Routes } from '@angular/router';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { AddAssignmentComponent } from './pages/assignments/add-assignment/add-assignment.component';
import { AssignmentDetailComponent } from './pages/assignments/assignment-detail/assignment-detail.component';
import { EditAssignmentComponent } from './pages/assignments/edit-assignment/edit-assignment.component';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { BoardComponent } from './pages/user/board/board.component';
import { StudentComponent } from './pages/student/student.component';
import { DahsboardComponent } from './pages/dashboard/dahsboard/dahsboard.component';
import { HomeComponent } from './pages/home/home.component';
import { TeacherComponent } from './pages/teacher/teacher.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home',
    component: DahsboardComponent,
    children: [
      { path: 'board', component: BoardComponent, canActivate: [AuthGuard] },
      {
        path: 'student',
        component: StudentComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'teacher',
        component: TeacherComponent,
        canActivate: [AuthGuard],
      },
    ],
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
];
