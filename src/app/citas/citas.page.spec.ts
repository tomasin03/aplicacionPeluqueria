import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { CitasPage } from './citas.page';

describe('CitasPage', () => {
  let component: CitasPage;
  let fixture: ComponentFixture<CitasPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CitasPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(CitasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
