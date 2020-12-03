import { Component, OnInit } from '@angular/core';
import { AlertController, ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject } from 'rxjs';
import { Cita } from '../models/cita';

const helper = new JwtHelperService();

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  private userData = new BehaviorSubject(null);
  NomUser = null;

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
  dia3 = '0'+ this.dia.toString();
  mes = this.date.getMonth() + 1;
  año = this.date.getFullYear();
  hora = this.date.getHours();
  today = (this.año + "-" + this.mes + "-" + this.dia);
  
  constructor(
    public alertController: AlertController,
    private router: Router,
    public accountService: AccountService,
    public toastController: ToastController
  ) {}

  ngOnInit() { 
    let token = localStorage.getItem('token');   
    if (token != null) {
      let decoded = helper.decodeToken(token);
      this.NomUser = decoded.NomUsuario;
      this.userData.next(decoded);
    }
    if (this.dia2 == 'Domingo') {
      this.cerrado = true;
    } else if (this.dia2 == 'Sabado') {
      this.cerrado = false;
      this.customHourValues = this.Sabado;
    } else {
      this.cerrado = false;
      this.customHourValues = this.Normal;
    }
    if (this.dia.toString().length == 1) {
      this.today = (this.año + "-" + this.mes + "-" + this.dia3);
    } else {
      this.today = (this.año + "-" + this.mes + "-" + this.dia);
    }
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

  reservarCita(fecha, datoH) {
    var hora = parseInt(datoH);
    if (this.NomUser != null) {
      var cita = {
        Fecha: fecha,
        Hora: hora,
        Dia: this.dia2,
        IdUsuario: this.NomUser,
        IdInvitado: 0
      }
      if (this.dia2 == undefined) {
        this.selecFecha();
      } else if (datoH == null) {
        this.selecHora();
      } else {
        let citaInfo: Cita = Object.assign({}, cita);
        this.accountService.createCita(citaInfo)
        .subscribe(persona => this.onSaveSuccess(),
        error => this.citaIncorrecta());
      }
    }
  }
  comprobarDisp(fecha, datoH) {
    var hora = parseInt(datoH);
    if (this.NomUser != null) {
      var cita = {
        Fecha: fecha,
        Hora: hora,
        Dia: this.dia2,
        IdUsuario: this.NomUser,
        IdInvitado: 0
      }
      if (this.dia2 == undefined) {
        this.selecFecha();
      } else if (datoH == null) {
        this.selecHora();
      } else {
        let citaInfo: Cita = Object.assign({}, cita);
        this.accountService.comprobarDisp(citaInfo)
        .subscribe(persona => this.citaDisponible(),
        error => this.citaIncorrecta());
        console.log("reservada");
      }
    }
  }
  onSaveSuccess() {
    this.router.navigate([""]);
  }

  estaLogueado() {
    return this.accountService.estaLogueado();
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
  
  async citaDisponible() {
    const toast = await this.toastController.create({
      message: '<h2>El dia y hora seleccionados están disponibles.<h2>',
      duration: 2000
    });
    toast.present();
  }
  
}
