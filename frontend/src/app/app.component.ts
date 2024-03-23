import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { RouterLink } from '@angular/router';
import { AuthService } from './shared/service/auth.service';
import { AssignmentsService } from './shared/service/assignments.service';
import { NavigationComponent } from './pages/layout/navigation/navigation.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink, NavigationComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit {
  constructor(private authService:AuthService,
              private assignmentsService: AssignmentsService,
              private router:Router) {}

  ngOnInit(): void {
      this.authService.isAdmin()
        .then(res =>{
          if (res){
            this.router.navigate(['/home']);
          }else{
            this.router.navigate(['/login']);
          }
        })
        .catch(() =>{});
  }


  genererDonneesDeTest() {
    // on utilise le service
    /* VERSION NAIVE
    this.assignmentsService.peuplerBD();
    */

    // VERSION AVEC Observable
    this.assignmentsService.peuplerBDavecForkJoin()
    .subscribe(() => {
      console.log("Données générées, on rafraichit la page pour voir la liste à jour !");
      window.location.reload();
      // On devrait pouvoir le faire avec le router, jussqu'à la version 16 ça fonctionnait avec
      // this.router.navigate(['/home'], {replaceUrl:true});
    });
  }
}
