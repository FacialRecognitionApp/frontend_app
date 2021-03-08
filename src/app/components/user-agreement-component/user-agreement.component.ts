import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss'],
})
export class UserAgreementComponent implements OnInit {
  @Output() userAgreementEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('emailInput')
  emailInput: IonInput;

  private canNextBtn = false;
  constructor() { }

  ngOnInit() {
    this.userAgreementEmitter.emit({
      canNext: this.canNextBtn,
      email: null
    });
  }

  changeAgreement(e) {
    if (e.target.checked == true) {
      this.canNextBtn = true;
    } else {
      this.canNextBtn = false;
    }
    this.userAgreementEmitter.emit({
      canNext: this.canNextBtn,
      email: this.emailInput.value
    });
  }

  changeEmail(e) {
    this.userAgreementEmitter.emit({
      canNext: this.canNextBtn,
      email: e.target.value
    });
  }
}