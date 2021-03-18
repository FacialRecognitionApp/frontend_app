import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonButton } from '@ionic/angular';
import { SurveyQuestion } from 'src/app/constants';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'survey-question',
  templateUrl: './survey-question.component.html',
  styleUrls: ['./survey-question.component.scss'],
})
export class SurveyQuestionComponent implements AfterViewInit {
  @Input() questions: Array<SurveyQuestion>;

  constructor(private surveyService: SurveyService) { }

  ngAfterViewInit() {
  }

}
