import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios from 'axios';
import { upload_video_url, add_user_url } from './constants';

@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  async uploadVideo(videoData: FormData, userId: number): Promise<void> {
    const res = await axios({
      method: 'POST',
      url: upload_video_url,
      data: videoData,
      params: {
        user_id: userId
      },
      headers: {
        'Content-Type': 'multipart/form-data;charset=UTF-8'
      }
    });

    console.log(res.data);

    if (res.data.success) {
      alert('Upload file success');
    }
    else {
      alert('Upload file fail!');
    }
  }

  async addUserRecord(email?: string): Promise<number> {
    const res = await axios({
      method: 'POST',
      url: add_user_url,
      data: { email: email },
    });
    console.log(res.data);

    if (res.data.success) {
      return res.data.user_id;
    }
    else {
      alert(res.data.message);
      return -1;
    }
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
