import { Routes } from '@angular/router';
import { AuthGuard } from './shared/guard/auth.guard';
import { LoginComponent } from './pages/user/login/login.component';
import { RegisterComponent } from './pages/user/register/register.component';
import { BoardComponent } from './pages/user/board/board.component';
import { StudentComponent } from './pages/student/student.component';
import { DahsboardComponent } from './pages/dashboard/dahsboard/dahsboard.component';
import { TeacherComponent } from './pages/teacher/teacher.component';
import { ResetpassComponent } from './pages/user/resetpass/resetpass.component';
import { CodeValidatorComponent } from './pages/user/code-validator/code-validator.component';
import { ForgotpassComponent } from './pages/user/forgotpass/forgotpass.component';

export const routes: Routes = [
  { path: '', redirectTo: '/home/board', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'forgot', component: ForgotpassComponent },
  { path: 'code', component: CodeValidatorComponent },
  { path: 'reset', component: ResetpassComponent },
  {
    path: 'home',
    component: DahsboardComponent,
    children: [
      { path: 'board', component: BoardComponent },
      { path: 'student', component: StudentComponent },
      { path: 'teacher', component: TeacherComponent },
    ],
    canActivate: [AuthGuard]
  },
];
