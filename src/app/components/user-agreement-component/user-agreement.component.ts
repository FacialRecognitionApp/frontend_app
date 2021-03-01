import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss'],
})
export class UserAgreementComponent implements OnInit {
  @Output() canNextEmitter: EventEmitter<boolean> = new EventEmitter();

  private canNextBtn = false;
  constructor() { }

  ngOnInit() {
    this.canNextEmitter.emit(this.canNextBtn);
  }

  changeAgreement(e) {
    if (e.target.checked == true) {
      this.canNextBtn = true;
    } else {
      this.canNextBtn = false;
    }
    this.canNextEmitter.emit(this.canNextBtn);
  }
}