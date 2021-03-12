import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SubmitSuccessPage } from './submit-success.page';

describe('SubmitSuccessPage', () => {
  let component: SubmitSuccessPage;
  let fixture: ComponentFixture<SubmitSuccessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSuccessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SubmitSuccessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
