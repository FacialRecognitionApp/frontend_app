import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RatingSurveyQuestion, SurveyAnswer, SurveyQuestion, SurveyRatingAnswer, VideoQuestion } from '../constants';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-submit-success',
  templateUrl: 'submit-success.page.html',
  styleUrls: ['submit-success.page.scss'],
})
export class SubmitSuccessPage implements OnInit, AfterViewInit {
  constructor(private router: Router) {
  }

  async ngOnInit(): Promise<void> {
  }

  ngAfterViewInit() {

  }
}
