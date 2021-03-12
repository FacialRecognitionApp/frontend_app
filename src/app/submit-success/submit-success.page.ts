import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { RatingSurveyQuestion, SurveyAnswer, SurveyQuestion, SurveyRatingAnswer, VideoQuestion } from '../constants';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-submit-success',
  templateUrl: 'submit-success.page.html',
  styleUrls: ['submit-success.page.scss'],
})
export class SubmitSuccessPage implements OnInit, AfterViewInit {
  constructor() {
  }

  async ngOnInit(): Promise<void> {
  }

  ngAfterViewInit() {

  }

}
