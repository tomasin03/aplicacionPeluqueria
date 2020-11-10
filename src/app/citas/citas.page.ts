import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { InvitadoService } from './invitado.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.page.html',
  styleUrls: ['./citas.page.scss'],
})
export class CitasPage implements OnInit {

  invitados

  constructor(
    private router: Router,
    public invitadoService: InvitadoService
  ) { }

  ngOnInit() {
    this.invitadoService.getInvitados()
    .subscribe(
      (data) => {this.invitados = data;},
      (error) => {console.log(error);}
    )
    console.log(this.invitados);
  }

  volver() {
    this.router.navigate(['/home']);
  }

}
