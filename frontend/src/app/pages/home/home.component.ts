import { Component, NgZone, ViewChild } from '@angular/core';
import { AssignmentOld } from '../assignments/assignment.model';
import {
  CdkVirtualScrollViewport,
  ScrollingModule,
} from '@angular/cdk/scrolling';
import { AssignmentsService } from '../../shared/service/assignments.service';
import { filter, map, pairwise, tap, throttleTime } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { MatListModule } from '@angular/material/list';
import { MatSliderModule } from '@angular/material/slider';
import { MatCardModule } from '@angular/material/card';
import { AssignmentCardComponent } from '../assignments/assignment-card/assignment-card.component';
import { Criteria } from '../../interfaces/criteria.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ScrollingModule,
    MatListModule,
    MatSliderModule,
    AssignmentCardComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  titre = 'Liste des assignments';

  // Pour la pagination
  page = 1;
  limit = 10;
  totalDocs!: number;
  totalPages!: number;
  nextPage!: number;
  prevPage!: number;
  hasNextPage!: boolean;
  hasPrevPage!: boolean;

  // tableau des assignments POUR AFFICHAGE
  displayedColumns: string[] = ['nom', 'dateDeRendu', 'rendu'];

  assignments: AssignmentOld[] = [];

  // pour virtual scroll infini
  @ViewChild('scroller') scroller!: CdkVirtualScrollViewport;

  // ici on injecte le service
  constructor(
    private assignmentsService: AssignmentsService,
    private ngZone: NgZone
  ) {}

  getColor(a: any) {
    return a.rendu ? 'green' : 'red';
  }

  ngOnInit() {
    console.log('ngOnInit assignments, appelée AVANT affichage du composant');
    this.getAssignmentsFromService();
  }

  ngAfterViewInit() {
    console.log(' ----- after view init ----');

    if (!this.scroller) return;

    // on s'abonne à l'évènement scroll du virtual scroller
    this.scroller
      .elementScrolled()
      .pipe(
        tap(() => {
          //const dist = this.scroller.measureScrollOffset('bottom');
          /*console.log(
            'dans le tap, distance par rapport au bas de la fenêtre = ' + dist
          );*/
        }),
        map((event) => {
          return this.scroller.measureScrollOffset('bottom');
        }),
        pairwise(),
        filter(([y1, y2]) => {
          return y2 < y1 && y2 < 100;
        }),
        // Pour n'envoyer des requêtes que toutes les 200ms
        throttleTime(200)
      )
      .subscribe(() => {
        // On ne rentre que si on scrolle vers le bas, que si
        // la distance de la scrollbar est < 100 pixels et que
        // toutes les 200 ms
        console.log('On demande de nouveaux assignments');
        // on va faire une requête pour demander les assignments suivants
        // et on va concatener le resultat au tableau des assignments courants
        console.log('je CHARGE DE NOUVELLES DONNEES page = ' + this.page);
        this.ngZone.run(() => {
          if (!this.hasNextPage) return;
          this.page = this.nextPage;
          this.getAssignmentsFromServicePourScrollInfini();
        });
      });
  }

  getAssignmentsFromService() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines({ page: this.page, limit: this.limit } as Criteria)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.assignments = data.docs;
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  getAssignmentsFromServicePourScrollInfini() {
    // on récupère les assignments depuis le service
    this.assignmentsService
      .getAssignmentsPagines({ page: this.page, limit: this.limit } as Criteria)
      .subscribe((data) => {
        // les données arrivent ici au bout d'un certain temps
        console.log('Données arrivées');
        this.assignments = [...this.assignments, ...data.docs];
        this.totalDocs = data.totalDocs;
        this.totalPages = data.totalPages;
        this.nextPage = data.nextPage;
        this.prevPage = data.prevPage;
        this.hasNextPage = data.hasNextPage;
        this.hasPrevPage = data.hasPrevPage;
      });
    console.log('Requête envoyée');
  }

  // Pour la pagination
  pagePrecedente() {
    this.page = this.prevPage;
    this.getAssignmentsFromService();
  }
  pageSuivante() {
    this.page = this.nextPage;
    this.getAssignmentsFromService();
  }

  premierePage() {
    this.page = 1;
    this.getAssignmentsFromService();
  }

  dernierePage() {
    this.page = this.totalPages;
    this.getAssignmentsFromService();
  }

  // Pour le composant angular material paginator
  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex + 1;
    this.limit = event.pageSize;
    this.getAssignmentsFromService();
  }
}
