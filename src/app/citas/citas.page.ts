import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AccountService } from '../account/account.service';
import { InvitadoService } from './invitado.service';

const helper = new JwtHelperService();

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  cita
  errorCita: boolean;
  
  date = new Date();
  dia = this.date.getDate();
  mes = this.date.getMonth() + 1;
  año = this.date.getFullYear();
  hora = this.date.getHours();
  today = (this.año + "-" + this.mes + "-" + this.dia);

  constructor(
    private router: Router,
    public invitadoService: InvitadoService,
    public account: AccountService
  ) { }

  ngOnInit() {
    let token = localStorage.getItem('token');    
    let decoded = helper.decodeToken(token);
    this.account.obtenerCita(decoded.NomUsuario)
    .subscribe(
      (data) => {this.cita = data;},
      (error) => {this.manejarError(error);}
    )
    //console.log(this.cita);
    //console.log(this.account.obtenerCita(decoded.NomUsuario));
  }

  volver() {
    this.router.navigate(['/home']);
  }

  manejarError(error) {
    if (error && error.error) {
      this.errorCita = true;
    }
  }
}
