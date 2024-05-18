import { Injectable } from '@angular/core';
import { AssignmentOld } from '../../pages/assignments/assignment.model';
import { Observable, forkJoin, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { LoggingService } from './logging.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// importation des données de test
import { bdInitialAssignments } from '../data';
import { Assignment } from '../../interfaces/assignment.interface';
import { Criteria } from '../../interfaces/criteria.interface';
import { environment } from '../../../environment/environment';

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

  uri = `${environment.apiBaseUrl}/assignments`;
  // uri = 'http://localhost:3000/api/assignments';
  // uri = "https://angularmbdsmadagascar2024.onrender.com/api/assignments";

  // retourne tous les assignments
  getAssignmentsUser(): Observable<AssignmentOld[]> {
    return this.http.get<AssignmentOld[]>(this.uri + '/User', {
      headers: this.headers,
    });
  }

  getAssignmentsSubject(subject: string): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri + '/Subject/' + subject, {
      headers: this.headers,
    });
  }

  getAssignments(criteria: Criteria): Observable<Assignment[]> {
    return this.http.get<Assignment[]>(this.uri, { headers: this.headers });
  }

  getAssignmentsPagines(criteria: Criteria): Observable<any> {
    return this.http.get<AssignmentOld[]>(this.uri, {
      params: { ...criteria },
      headers: this.headers,
    });
  }

  // renvoie un assignment par son id, renvoie undefined si pas trouvé
  getAssignment(id: string): Observable<Assignment | undefined> {
    return this.http.get<Assignment>(this.uri + '/' + id, {
      headers: this.headers,
    });
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

  updateAssignment(id: string, assignment: Assignment): Observable<any> {
    // l'assignment passé en paramètre est le même objet que dans le tableau
    // plus tard on verra comment faire avec une base de données
    // il faudra faire une requête HTTP pour envoyer l'objet modifié
    this.logService.log(assignment.title, 'modifié');
    //return of("Assignment modifié avec succès");
    return this.http.put<Assignment>(this.uri + "/" + id, assignment, { headers: this.headers });
  }

  rendreAssignment(id: string, assignment: Assignment): Observable<any> {
    return this.http.post<Assignment>(this.uri + "/rendre/" + id, {score: assignment.score}, { headers: this.headers });
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
