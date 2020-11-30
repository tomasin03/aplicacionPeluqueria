import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Usuario } from 'src/app/models/usuario';
import { Cita } from '../models/cita';

@Injectable({
  providedIn: 'root'
})
export class AccountService {

  private apiURL = 'https://localhost:44328/api/';

  constructor(public http: HttpClient) {
    //console.log('Hola proveedror 1')
  }

  obtenerCitas(): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiURL + 'cita');
  }

  obtenerCita(idCita: string): Observable<Cita[]> {
    return this.http.get<Cita[]>(this.apiURL + 'cita/' + idCita);
  }
  
  comprobarDisp(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiURL + "cita/disp", cita);
  }

  createCita(cita: Cita): Observable<Cita> {
    return this.http.post<Cita>(this.apiURL + "cita/create", cita);
  }

  obtenerDatos(){
    return this.http.get('https://localhost:44328/api/usuario');
  }

  create(userInfo: Usuario): Observable<any> {
    return this.http.post<any>(this.apiURL + "login/create", userInfo);
  }

  login(userInfo: Usuario): Observable<any> {         
    return this.http.post<any>(this.apiURL + "login", userInfo);        
  }
  
  obtenerToken(): string {
    return localStorage.getItem("token");
  }
  
  obtenerExpiracionToken(): string {
    return localStorage.getItem("tokenExpiration");
  }


  logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("tokenExpiration");
  }
  
  estaLogueado(): boolean {
  
    var exp = this.obtenerExpiracionToken();
  
    if (!exp) {
      // el token no existe
      return false;
    }
  
    var now = new Date().getTime();
    var dateExp = new Date(exp);
  
    if (now >= dateExp.getTime()) {
        // ya expiró el token
      localStorage.removeItem('token');
      localStorage.removeItem('tokenExpiration');
      return false;
    } else {
      return true;
    }
      
  }

}
