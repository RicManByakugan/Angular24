import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { NavigationComponent } from '../../layout/navigation/navigation.component';
import { SidenavComponent } from '../../layout/sidenav/sidenav.component';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';

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

}
