import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios from 'axios';
import { upload_video_url, add_user_url, get_all_video_questions_url, get_all_survey_questions_url, SurveyQuestion, SurveyAnswer, upload_survey_answers_url } from './constants';
import { LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient, private loadingController: LoadingController) { }

  // ===================== User Id ========================
  async addUserRecord(email?: string): Promise<number> {
    // loading indicator
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Please wait...',
    });
    await loading.present();

    const res = await axios({
      method: 'POST',
      url: add_user_url,
      data: { email: email },
    });

    await loading.dismiss();
    console.log(res.data);

    if (res.data.success) {
      return res.data.user_id;
    }
    else {
      alert(res.data.message);
      return -1;
    }
  }

  // ======================= Video ==============================
  async getAllVideoQuestions(): Promise<Array<any>> {
    const res = await axios({
      method: 'GET',
      url: get_all_video_questions_url
    });
    console.log(res.data);

    if (res.data.success) {
      return res.data.data;
    }
    else {
      alert(res.data.message);
      return null;
    }
  }

  async uploadVideo(videoData: FormData, userId: number, videoTypeId: number): Promise<void> {
    // loading indicator
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Please wait...',
    });
    await loading.present();

    const res = await axios({
      method: 'POST',
      url: upload_video_url,
      data: videoData,
      params: {
        user_id: userId,
        video_type_id: videoTypeId
      },
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    });

    await loading.dismiss();
    console.log(res.data);

    alert(res.data.message);
  }

  // ======================= Survey ==============================
  async getAllSurveyQuestions(): Promise<Array<any>> {
    const res = await axios({
      method: 'GET',
      url: get_all_survey_questions_url
    });
    console.log(res.data);

    if (res.data.success) {
      return res.data.data;
    }
    else {
      alert(res.data.message);
      return null;
    }
  }

  async uploadSurveyQuestionAnswers(surveyAnswerData: Array<SurveyAnswer>, userId: number): Promise<void> {
    // loading indicator
    const loading = await this.loadingController.create({
      mode: 'ios',
      message: 'Please wait...',
    });
    await loading.present();

    const res = await axios({
      method: 'POST',
      url: upload_survey_answers_url,
      data: {
        user_id: userId,
        survey_answer: surveyAnswerData
      },
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    });

    await loading.dismiss();
    console.log(res.data);

    alert(res.data.message);
  }

  /** 
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred
      console.error('An error occurred:', error.error.message);
    } else {
      // Backend error
      console.error(
        `Backend returned: ${error.status}, ` +
        `body: ${error.error}`);
    }
    // Return a user-facing error message
    return throwError(
      'Something bad happened; please try again later.');
  }*/
}
