import { Component, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AccountService } from '../account/account.service';

@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.page.html',
  styleUrls: ['./reserva.page.scss'],
})
export class ReservaPage implements OnInit {

  date1
  dia2
  date = new Date();


  customYearValues = [2021, 2020];
  customDayShortNames = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'];
  customHourValues = [9,10,11,12,13,16,17,18,19,20];
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
    public accountService: AccountService
  ) {

   }

  ngOnInit() {  }

  rellenarFecha() {
    // https://www.w3schools.com/js/js_array_iteration.asp
  }

  mostrarFecha(fecha) {
    this.date1 = new Date(fecha.slice(0,4), fecha.slice(5,7) - 1,fecha.slice(8,10))
    
    console.log(fecha);
    this.dia2 = this.customDayShortNames[this.date1.getDay()];
    
    console.log(fecha.slice(0,4));
    console.log(fecha.slice(5,7));
    console.log(fecha.slice(8,10));
    
    console.log(this.dia2);
    console.log(this.hora);
  }  

  estaLogueado() {
    return this.accountService.estaLogueado();
  }

}
