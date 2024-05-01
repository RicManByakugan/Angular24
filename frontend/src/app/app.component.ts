import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/service/auth.service';
import { AssignmentsService } from './shared/service/assignments.service';
import { LoginComponent } from './pages/user/login/login.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {}
}
