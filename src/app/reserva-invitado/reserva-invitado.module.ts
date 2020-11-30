import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ReservaInvitadoPageRoutingModule } from './reserva-invitado-routing.module';

import { ReservaInvitadoPage } from './reserva-invitado.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaInvitadoPageRoutingModule
  ],
  declarations: [ReservaInvitadoPage]
})
export class ReservaInvitadoPageModule {}
