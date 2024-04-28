import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from './shared/service/auth.service';
import { AssignmentsService } from './shared/service/assignments.service';
import { NavigationComponent } from './pages/layout/navigation/navigation.component';
import { SidenavComponent } from './pages/layout/sidenav/sidenav.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavigationComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private assignmentsService: AssignmentsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // this.authService.isAdmin()
    //   .then(res =>{
    //     if (res){
    //       this.router.navigate(['/home']);
    //     }else{
    //       this.router.navigate(['/login']);
    //     }
    //   })
    //   .catch(() =>{});
  }
}
