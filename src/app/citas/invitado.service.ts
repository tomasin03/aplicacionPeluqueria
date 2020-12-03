import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Invitado } from 'src/app/models/invitado';

@Injectable({
  providedIn: 'root'
})
export class InvitadoService {

  private apiURL = 'https://localhost:44328/api/login/invitado';

    constructor(public http: HttpClient) { }

    getInvitados(): Observable<Invitado[]> {
      return this.http.get<Invitado[]>(this.apiURL);
    }

    createInvitado(invitado: Invitado): Observable<Invitado> {
      return this.http.post<Invitado>(this.apiURL, invitado);
    }
}