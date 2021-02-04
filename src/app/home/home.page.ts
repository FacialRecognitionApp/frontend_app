import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

export interface Question {
  description: string;
  type: string;
  answer: string;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  public surveyQuestions: Array<Question> = [
    {
      description: 'Test Q',
      type: 'video',
      answer: ''
    },
    {
      description: 'Test Q',
      type: 'multi-choice',
      answer: ''
    }
  ];

  public questionToRender;
  
  constructor() { }

  ngOnInit() {
    this.questionToRender = this.surveyQuestions[0]; // start from first question
  }

}
