import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { IonButton, IonProgressBar, LoadingController } from '@ionic/angular';
import { SurveyQuestionComponent } from '../components/survey-question-component/survey-question.component';
import { RatingSurveyQuestion, SurveyAnswer, SurveyQuestion, SurveyRatingAnswer, VideoQuestion } from '../constants';
import { SurveyService } from '../survey.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('backBtn') backBtn: IonButton;
  @ViewChild('nextBtn') nextBtn: IonButton;

  public currentPageIndex = 0;
  public totalPageCount = 0;
  public pageArray;
  private userEmailAddress;
  public userId = -1;
  public videoQuestions: Array<VideoQuestion> = [];
  public surveyQuestions: Array<SurveyQuestion> = [];

  constructor(private surveyService: SurveyService, private loadingController: LoadingController, private router: Router) {
  }

  async ngOnInit(): Promise<void> {
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Please wait...',
    });
    await loading.present();

    await this.loadVideoQuestions();
    await this.loadSurveyQuestions();

    await loading.dismiss();

    this.totalPageCount = 2 + this.videoQuestions.length + 1; // 2 => intro + user agreement page, 1 => survey section
    this.pageArray = [];
    for (let i = 0; i < this.totalPageCount; i++) {
      this.pageArray.push(i);
    }
  }

  ngAfterViewInit() {
    if (this.currentPageIndex == 0)
      this.backBtn.disabled = true;
  }

  private async loadVideoQuestions(): Promise<void> {
    this.videoQuestions = [];
    const res = await this.surveyService.getAllVideoQuestions();
    if (res) {
      // push to local defined type object
      res.forEach(data => {
        const questionToPush: VideoQuestion =
        {
          video_type_id: data.video_type_id, // from backend
          video_type_content: data.video_type_content, // from backend
          duration_ms: 1000
        };

        this.videoQuestions.push(questionToPush);
      });
    }
  }

  private async loadSurveyQuestions(): Promise<void> {
    this.surveyQuestions = [];
    const res = await this.surveyService.getAllSurveyQuestions();
    if (res) {
      // push to local defined type object
      res.forEach(data => {
        let ratingQuestions: Array<RatingSurveyQuestion> = null;
        if (data.rating_questions) {
          ratingQuestions = [];
          data.rating_questions.forEach(ratingQ => {
            ratingQuestions.push(
              {
                rating_question_id: ratingQ.rating_question_id,
                rating_question_content: ratingQ.rating_question_content,
                rating: null
              })
          });
        }
        const questionToPush: SurveyQuestion =
        {
          survey_question_id: data.survey_question_id,
          question_content: data.question_content,
          question_type_id: data.question_type_id,
          type_name: data.type_name,
          rating_questions: ratingQuestions,
          answer_content: null
        }
        this.surveyQuestions.push(questionToPush);
      })
    }
  }

  public async next(): Promise<void> {
    // click submit on last page
    if (this.currentPageIndex == this.totalPageCount - 1) {
      await this.submit();
      return;
    } else {
      let canNext = true;
      // retrieve potential email in user agreement page and disable back button
      if (this.currentPageIndex == 1) {
        this.backBtn.disabled = true;
        // add user id
        this.userId = await this.surveyService.addUserRecord(this.userEmailAddress);
        if (this.userId == -1) {
          // bad response
          canNext = false;
        }
        console.log(this.userId);
      }
      else {
        if (this.backBtn.disabled)
          this.backBtn.disabled = false;
      }

      if (canNext)
        this.currentPageIndex += 1;

      // reach the last page
      if (this.currentPageIndex == this.totalPageCount - 1) {
        // this.nextBtn.disabled = true;
        document.getElementById('nextBtn').innerHTML = "Submit";
      }
    }
  }

  public back(): void {
    if (document.getElementById('nextBtn').innerHTML == "Submit") {
      document.getElementById('nextBtn').innerHTML = "Next";
    }

    if (this.nextBtn.disabled)
      this.nextBtn.disabled = false;

    this.currentPageIndex -= 1;
    if (this.currentPageIndex == 0 || this.currentPageIndex == 2)
      this.backBtn.disabled = true;

  }

  public getUserAgreementVals(e: any): void {
    this.nextBtn.disabled = !e.canNext;
    this.userEmailAddress = e.email;
  }

  public async submit(): Promise<void> {
    console.log(this.videoQuestions);
    console.log(this.surveyQuestions);

    await this.submitSurveyAnswer();
    this.router.navigateByUrl('/submit-success');
  }

  /**
   * upload survey answer
   */
  public async submitSurveyAnswer(): Promise<void> {

    const surveyAnswerData: Array<SurveyAnswer> = [];

    this.surveyQuestions.forEach(surveyQuestion => {
      let answerContent: string | Array<SurveyRatingAnswer> = null;
      // rating question case
      if (surveyQuestion.type_name == 'Rating' && surveyQuestion.rating_questions != null) {
        answerContent = [];

        surveyQuestion.rating_questions.forEach(ratingQuestion => {
          const ratingAnswer: SurveyRatingAnswer = {
            rating_question_id: ratingQuestion.rating_question_id,
            rating: ratingQuestion.rating
          };
          (answerContent as Array<SurveyRatingAnswer>).push(ratingAnswer);
        });
      }
      else {
        answerContent = surveyQuestion.answer_content;
      }
      const surveyAnswerToPush: SurveyAnswer = {
        survey_question_id: surveyQuestion.survey_question_id,
        question_type_id: surveyQuestion.question_type_id,
        answer_content: answerContent
      }

      surveyAnswerData.push(surveyAnswerToPush);
    });

    console.log(surveyAnswerData);
    await this.surveyService.uploadSurveyQuestionAnswers(surveyAnswerData, this.userId);
  }
}
