import { Injectable } from '@angular/core';
import { AssignmentOld } from '../../pages/assignments/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importation des données de test
import { bdInitialAssignments } from '../data';
import { Assignment } from '../../interfaces/assignment.interface';

@Injectable({
  providedIn: 'root',
})
export class AssignmentsService {
  assignments: AssignmentOld[] = [];
  token = localStorage.getItem('user') + ' ' + localStorage.getItem('token');
  headers = new HttpHeaders({
    Authorization: this.token,
  });

  constructor(private logService: LoggingService, private http: HttpClient) {}

  uri = 'http://localhost:3000/api/assignments';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/api/assignments";

  // retourne tous les assignments
  getAssignmentsUser(): Observable<AssignmentOld[]> {
    return this.http.get<AssignmentOld[]>(this.uri + '/User', {
      headers: this.headers,
    });
  }

  getAssignments(): Observable<AssignmentOld[]> {
    return this.http.get<AssignmentOld[]>(this.uri, { headers: this.headers });
  }

  getAssignmentsPagines(page: number, limit: number): Observable<any> {
    return this.http.get<AssignmentOld[]>(
      this.uri + '?page=' + page + '&limit=' + limit
    );
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id: number): Observable<AssignmentOld | undefined> {
    return this.http.get<AssignmentOld>(this.uri + '/' + id).pipe(
      catchError(
        this.handleError<any>(
          '### catchError: getAssignments by id avec id=' + id
        )
      )
      /*
      map(a => {
        a.nom += " MODIFIE PAR LE PIPE !"
        return a;
      }),
      tap(a => console.log("Dans le pipe avec " + a.nom)),
      map(a => {
        a.nom += " MODIFIE UNE DEUXIEME FOIS PAR LE PIPE !";
        return a;
      })
      */
    );
    //let a = this.assignments.find(a => a.id === id);
    //return of(a);
  }

  // Methode appelée par catchError, elle doit renvoyer
  // i, Observable<T> où T est le type de l'objet à renvoyer
  // (généricité de la méthode)
  private handleError<T>(operation: any, result?: T) {
    return (error: any): Observable<T> => {
      console.log(error); // pour afficher dans la console
      console.log(operation + ' a échoué ' + error.message);

      return of(result as T);
    };
  }

  // ajoute un assignment et retourne une confirmation
  addAssignment(assignment: Assignment): Observable<any> {
    //this.assignments.push(assignment);
    this.logService.log(assignment.title, 'ajouté');
    //return of("Assignment ajouté avec succès");
    return this.http.post<Assignment>(this.uri, assignment, {
      headers: this.headers,
    });
  }

  updateAssignment(assignment: AssignmentOld): Observable<any> {
    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment.nom, 'modifié');
    //return of("Assignment modifié avec succès");
    return this.http.put<AssignmentOld>(this.uri, assignment, {
      headers: this.headers,
    });
  }

  deleteAssignment(assignment: AssignmentOld): Observable<any> {
    // on va supprimer l'assignment dans le tableau
    //let pos = this.assignments.indexOf(assignment);
    //this.assignments.splice(pos, 1);
    this.logService.log(assignment.nom, 'supprimé');
    //return of("Assignment supprimé avec succès");
    return this.http.delete(this.uri + '/' + assignment._id, {
      headers: this.headers,
    });
  }

  // // VERSION NAIVE (on ne peut pas savoir quand l'opération des 1000 insertions est terminée)
  // peuplerBD() {
  //   // on utilise les données de test générées avec mockaroo.com pour peupler la base
  //   // de données
  //   bdInitialAssignments.forEach((a) => {
  //     let nouvelAssignment = new AssignmentOld();
  //     nouvelAssignment.nom = a.nom;
  //     nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelAssignment.rendu = a.rendu;

  //     this.addAssignment(nouvelAssignment).subscribe(() => {
  //       console.log('Assignment ' + a.nom + ' ajouté');
  //     });
  //   });
  // }

  // peuplerBDavecForkJoin(): Observable<any> {
  //   let appelsVersAddAssignment: Observable<any>[] = [];

  //   bdInitialAssignments.forEach((a) => {
  //     const nouvelAssignment = new AssignmentOld();
  //     nouvelAssignment.nom = a.nom;
  //     nouvelAssignment.dateDeRendu = new Date(a.dateDeRendu);
  //     nouvelAssignment.rendu = a.rendu;

  //     appelsVersAddAssignment.push(this.addAssignment(nouvelAssignment));
  //   });

  //   return forkJoin(appelsVersAddAssignment);
  // }
}
