import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';

export interface Question {
  description: string;
  type: string;
  answerData: FormData;
}

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('backBtn') backBtn: IonButton;
  @ViewChild('nextBtn') nextBtn: IonButton;
  public currentPageIndex = 2; // test purpose
  public totalPageCount;
  public surveyQuestions: Array<Question> = [
    {
      description: 'Test Q',
      type: 'video',
      answerData: null
    },
    {
      description: 'Test Another Question',
      type: 'video',
      answerData: null
    },
    {
      description: 'Test Another Question 3',
      type: 'video',
      answerData: null
    }
  ];
  
  constructor() {
    this.totalPageCount = this.surveyQuestions.length + 2;
   }

  ngOnInit() {
  }

  ngAfterViewInit() {
    if (this.currentPageIndex == 0)
      this.backBtn.disabled = true;
  }

  public next(): void {
    if (this.backBtn.disabled) 
      this.backBtn.disabled = false;

    this.currentPageIndex += 1;
    if (this.currentPageIndex == this.totalPageCount -1) 
      this.nextBtn.disabled = true;
    

    console.log(this.surveyQuestions);
  }

  public back(): void {
    if (this.nextBtn.disabled)
      this.nextBtn.disabled = false;
    
    this.currentPageIndex -= 1;
    if (this.currentPageIndex == 0)
      this.backBtn.disabled = true;
    
  }

  public toggleNextBtn(e): void {
    this.nextBtn.disabled = !e;
  }
}
