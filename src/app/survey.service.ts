import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios from 'axios';
import { upload_video_url, add_user_url, get_all_video_questions_url, get_all_survey_questions_url, SurveyQuestion, SurveyAnswer, upload_survey_answers_url } from './constants';
import { AlertController, LoadingController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private http: HttpClient, private loadingController: LoadingController, private alertController: AlertController) { }

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
      await this.getAlert(res.data.message);
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
      await this.getAlert(res.data.message);
      return null;
    }
  }

  async uploadVideo(videoData: FormData, userId: number, videoTypeId: number): Promise<boolean | string> {
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

    console.log(res.data);

    if (!res.data.success) {
      return res.data.message;
    }
    return true;
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
      await this.getAlert(res.data.message);
      return null;
    }
  }

  async uploadSurveyQuestionAnswers(surveyAnswerData: Array<SurveyAnswer>, userId: number): Promise<boolean | string> {
    const res = await axios({
      method: 'POST',
      url: upload_survey_answers_url,
      data: {
        user_id: userId,
        survey_answer: surveyAnswerData
      },
    });

    console.log(res.data);
    if (!res.data.success) {
      return res.data.message;
    }
    return true;
  }

  
  private async getAlert(msg: string): Promise<void> {
    let alert = await this.alertController.create({
      header: 'Error',
      subHeader: msg,
      buttons: ['Dismiss']
    });
    await alert.present();
  }
}
