import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReservaInvitadoPage } from './reserva-invitado.page';

describe('ReservaInvitadoPage', () => {
  let component: ReservaInvitadoPage;
  let fixture: ComponentFixture<ReservaInvitadoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReservaInvitadoPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReservaInvitadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
