import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Cita } from '../models/cita';
import { InvitadoService } from '../citas/invitado.service';
import { Invitado } from '../models/invitado';

const helper = new JwtHelperService();

@Component({
  selector: 'app-reserva-invitado',
  templateUrl: './reserva-invitado.page.html',
  styleUrls: ['./reserva-invitado.page.scss'],
})
export class ReservaInvitadoPage implements OnInit {

  date1
  dia2
  date = new Date();
  cerrado: boolean;
  
  customYearValues = [2021, 2020];
  customDayShortNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  customHourValues = [];
  Normal = [9,10,11,12,13,16,17,18,19,20];
  Sabado = [9,10,11,12,13];

  dia1 = this.customDayShortNames[this.date.getDay()];
  dia = this.date.getDate();
  mes = this.date.getMonth() + 1;
  año = this.date.getFullYear();
  hora = this.date.getHours();
  today = (this.año + "-" + this.mes + "-" + this.dia);
  
  constructor(
    public alertController: AlertController,
    private router: Router,
    public accountService: AccountService,
    public toastController: ToastController,
    public invitadoService: InvitadoService
  ) {

   }

  ngOnInit() { 
    if (this.dia2 == 'Domingo') {
      this.cerrado = true;
    } else if (this.dia2 == 'Sabado') {
      this.cerrado = false;
      this.customHourValues = this.Sabado;
    } else {
      this.cerrado = false;
      this.customHourValues = this.Normal;
    }
  } 
    

  rellenarFecha() {
    // https://www.w3schools.com/js/js_array_iteration.asp
  }
  _ionChange(event) {
    var fecha = event.target.value;
    this.date1 = new Date(fecha.slice(0,4), fecha.slice(5,7) - 1,fecha.slice(8,10))
    this.dia2 = this.customDayShortNames[this.date1.getDay()];
    
    if (this.dia2 == 'Domingo') {
      this.cerrado = true;
    } else if (this.dia2 == 'Sabado') {
      this.cerrado = false;
      this.customHourValues = this.Sabado;
    } else {
      this.cerrado = false;
      this.customHourValues = this.Normal;
    }
  } 

  reservarCita(fecha, datoH, email, nombre, apellido) {
    var hora = parseInt(datoH);    
    var invit = {
      Nombre: nombre,
      Apellido: apellido,
      Email: email
    }    
    if(email == "" || nombre == "" || apellido == "") {
      this.rellenarDatos();
    } else if (this.dia2 == undefined) {
      this.selecFecha();
    } else if (datoH == null) {
      this.selecHora();
    } else {
      let invitado: Invitado = Object.assign({}, invit);
      this.invitadoService.createInvitado(invitado)
      .subscribe(persona => this.obtenerId(persona, fecha, hora),
      error => this.manejarError(error));              
    }      
    console.log("reservada");
    
  }
  comprobarDisp(fecha, datoH, email, nombre, apellido) {
    var hora = parseInt(datoH);    
    var cita = {
      Fecha: fecha,
      Hora: hora,
      Dia: this.dia2,
      IdUsuario: null,
      IdInvitado: 0
    }
    if(email == "" || nombre == "" || apellido == "") {
      this.rellenarDatos();
    } else if (this.dia2 == undefined) {
      this.selecFecha();
    } else if (datoH == null) {
      this.selecHora();
    } else {
      let citaInfo: Cita = Object.assign({}, cita);
      this.accountService.comprobarDisp(citaInfo)
      .subscribe(_persona => this.citaDisponible(),
      error => this.manejarError(error));
    }    
  }
  onSaveSuccess() {
    this.router.navigate([""]);
  }
  obtenerId(persona, fecha, hora) {
    var cita = {
      Fecha: fecha,
      Hora: hora,
      Dia: this.dia2,
      IdUsuario: null,
      IdInvitado: persona.idInvitado
    }
    let citaInfo: Cita = Object.assign({}, cita);
    this.accountService.createCita(citaInfo)
    .subscribe(_persona => this.onSaveSuccess(),
    error => this.manejarError(error));
    //console.log(citaInfo);
  }

  estaLogueado() {
    return this.accountService.estaLogueado();
  }

  manejarError(error) {
    if (error && error.error) {
      this.citaIncorrecta();
    }
  }
  async citaDisponible() {
    const toast = await this.toastController.create({
      message: '<h2>El dia y hora seleccionados están disponibles.<h2>',
      duration: 2000
    });
    toast.present();
  }
  async citaIncorrecta() {
    const toast = await this.toastController.create({
      message: '<h2>Lo sentimos, esta cita ya está reservada.<h2>',
      duration: 2000
    });
    toast.present();
  }
  async selecFecha() {
    const toast = await this.toastController.create({
      message: '<h2>Por favor seleccione una fecha.<h2>',
      duration: 2000
    });
    toast.present();
  }
  async selecHora() {
    const toast = await this.toastController.create({
      message: '<h2>Por favor seleccione una hora.<h2>',
      duration: 2000
    });
    toast.present();
  }
  async rellenarDatos() {
    const toast = await this.toastController.create({
      message: '<h2>Por favor rellene todos los datos.<h2>',
      duration: 2000
    });
    toast.present();
  }
}
