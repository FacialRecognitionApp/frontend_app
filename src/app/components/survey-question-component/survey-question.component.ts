import { AfterViewInit, Component, ElementRef, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { IonButton } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { SurveyQuestion } from 'src/app/constants';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss'],
})
export class SurveyQuestionComponent implements AfterViewInit, OnDestroy {
  @Input() questions: Array<SurveyQuestion>;
  @Output() toggleDisableEmitter: EventEmitter<any> = new EventEmitter();

  @ViewChild('surveyForm') surveyForm: NgForm;
  private formChangesSubscription: Subscription = null;
  private canNextBtn = false;

  constructor(private surveyService: SurveyService, private formBuilder: FormBuilder) {

  }

  ngAfterViewInit() {
    this.formChangesSubscription = this.surveyForm.form.valueChanges.subscribe(val => {
      this.toggleDisableState();
    })
  }

  ngOnDestroy() {
    this.formChangesSubscription.unsubscribe();
  }

  toggleDisableState() {
    if (this.surveyForm.form.valid) {
      this.canNextBtn = true;
    } else {
      this.canNextBtn = false;
    }
    this.toggleDisableEmitter.emit({
      canNext: this.canNextBtn
    });
  }
  
}
