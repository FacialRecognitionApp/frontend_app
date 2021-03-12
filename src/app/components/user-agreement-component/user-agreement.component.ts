import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'user-agreement',
  templateUrl: './user-agreement.component.html',
  styleUrls: ['./user-agreement.component.scss'],
})
export class UserAgreementComponent implements OnInit {
  @Output() userAgreementEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('emailBlock')
  emailBlock: ElementRef;

  private canNextBtn = false;

  public emailForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.emailForm = formBuilder.group({
      email: ['']
    });
  }

  ngOnInit() {
    this.emitVals();
  }

  changeAgreement(e) {
    if (e.target.checked == true) {
      this.canNextBtn = true;
    } else {
      this.canNextBtn = false;
    }
    this.emitVals();
  }

  changeRequest(e) {
    if (e.target.checked == true) {
      this.emailBlock.nativeElement.hidden = false;
      this.emailForm.controls.email.setValidators(Validators.compose([Validators.required, Validators.email]));
      this.emailForm.controls.email.setValue(this.emailForm.controls.email.value); // update error msg
    } else {
      this.emailBlock.nativeElement.hidden = true;

      this.emailForm.controls.email.setErrors(null);
      this.emailForm.controls.email.clearValidators();
      this.emailForm.controls.email.setValue('');
    }
    this.emitVals();
  }

  changeEmail() {
    this.emitVals();
  }

  emitVals() {
    this.userAgreementEmitter.emit({
      canNext: this.canNextBtn && this.emailForm.valid,
      email: this.emailForm.controls.email.value
    });
  }
}