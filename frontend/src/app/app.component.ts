import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from './shared/service/auth.service';
import { AssignmentsService } from './shared/service/assignments.service';
import { LoginComponent } from './pages/user/login/login.component';
import { AuthGuard } from './shared/guard/auth.guard';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  providers: [AuthGuard],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
    if (!this.authService.isAdmin()) {
      this.router.navigate(['/login']);
    }
  }
}
