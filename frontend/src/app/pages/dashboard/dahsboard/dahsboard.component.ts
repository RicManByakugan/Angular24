import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../layout/navigation/navigation.component';
import { SidenavComponent } from '../../layout/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../shared/service/auth.service';

@Component({
  selector: 'app-dahsboard',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    NavigationComponent,
    SidenavComponent,
    MatSidenavModule,
    MatButtonModule,],
  templateUrl: './dahsboard.component.html',
  styleUrl: './dahsboard.component.css'
})
export class DahsboardComponent {
  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService
      .isAdmin()
      .then((res) => {
        console.log(res);
        if (!res) {
          this.router.navigate(['login']);
        }
      })
      .catch((err) => console.log(err));
  }

}
