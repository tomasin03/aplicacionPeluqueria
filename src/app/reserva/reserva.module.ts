import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ReservaPageRoutingModule } from './reserva-routing.module';
import { ReservaPage } from './reserva.page';

import { CalendarModule } from 'ion2-calendar';
import { NgCalendarModule  } from 'ionic2-calendar';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReservaPageRoutingModule,
    CalendarModule,
    NgCalendarModule
  ],
  declarations: [ReservaPage],
  providers: [{ provide: LOCALE_ID, useValue: 'es, Es' }]
})
export class ReservaPageModule {}
