import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import axios from 'axios';

const upload_video_url = "http://localhost:7000/video/upload_file";
@Injectable({
  providedIn: 'root'
})
export class UploadService {

  constructor(private http: HttpClient) { }

  uploadVideo(videoUrl: string) {
    /** 
    return this.http.post<any>(upload_video_url, videoUrl)
      .pipe(
        catchError(this.handleError)
      );*/
        axios({
          method: 'POST',
          url: upload_video_url,
          data: videoUrl,
          headers: {
            'Content-Type': 'multipart/form-data;charset=UTF-8'
          }
        }).then(res => {
          console.log(res);
          if (res.data.success) {
            alert('Upload file success');
          }
          else {
            alert('Upload file fail!');
          }
        });

  }

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
  }
}
