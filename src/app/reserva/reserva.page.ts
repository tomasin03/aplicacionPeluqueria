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

  constructor(
    public alertController: AlertController,
    private router: Router,
    public accountService: AccountService
  ) { }

  ngOnInit() {
    if (this.estaLogueado() == false) {
    this.presentAlertPrompt()
    }
  }
  
  async presentAlertPrompt() {

    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header: '¿Desea continuar como Invitado o como Usuario?',
      buttons: [
        {
          text: 'Invitado',
          role: 'invitado',
          cssClass: 'secondary',
          handler: () => {
            console.log('Confirm Invitado');
          }
        }, {
          text: 'Usuario',
          handler: () => {
            this.router.navigate(['/login']);
          }
        }, {
          text: 'Cancelar',
          role: 'cancelar',
          cssClass: 'secondary',
          handler: () => {
            this.router.navigate(['/home']);
          }
        }
      ]
    });

    await alert.present();
  }
  

  estaLogueado() {
    return this.accountService.estaLogueado();
  }

}
