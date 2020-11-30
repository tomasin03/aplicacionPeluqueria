import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReservaInvitadoPage } from './reserva-invitado.page';

const routes: Routes = [
  {
    path: '',
    component: ReservaInvitadoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ReservaInvitadoPageRoutingModule {}
