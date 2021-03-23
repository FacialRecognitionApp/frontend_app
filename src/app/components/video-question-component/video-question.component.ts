import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonButton } from '@ionic/angular';
import { CircleProgressComponent } from 'ng-circle-progress';
import { VideoQuestion } from 'src/app/constants';
import { SurveyService } from 'src/app/survey.service';

@Component({
  selector: 'video-question',
  templateUrl: './video-question.component.html',
  styleUrls: ['./video-question.component.scss'],
})
export class VideoQuestionComponent implements AfterViewInit {
  @Input() question: VideoQuestion;
  @Input() userId: number;
  @ViewChild('faceRecVideo')
  private faceRecVideo: ElementRef;
  @ViewChild('countdown')
  private countdown: CircleProgressComponent;
  private videoData: FormData;

  constructor(private sanitizer: DomSanitizer, private surveyService: SurveyService) { }

  ngAfterViewInit() {
    if (this.question.video_url) {
      this.transferToPreview(this.question.video_url);
    }
  }

  wait(delayInMS) {
    return new Promise(resolve => setTimeout(resolve, delayInMS));
  }

  // reference from https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
  startRecording(stream: MediaStream, lengthInMS: number) {
    let recorder = new MediaRecorder(stream);
    let data = [];

    recorder.ondataavailable = event => data.push(event.data);
    recorder.start();

    let stopped = new Promise((resolve, reject) => {
      recorder.onstop = resolve;
      recorder.onerror = event => reject(event);
    });

    let recorded = this.wait(lengthInMS).then(
      () => recorder.state == "recording" && recorder.stop()
    );

    return Promise.all([
      stopped,
      recorded
    ]).then(() => data);
  }

  startButtonEvent() {
    const video = this.faceRecVideo.nativeElement;
    document.getElementById('startBtn').setAttribute('disabled', 'true');
    document.getElementById('preview').innerHTML = '';
    video.controls = false;

    navigator.mediaDevices.getUserMedia({
      video: true,
      audio: false
    })
      .then(stream => {
        console.log(stream);
        video.srcObject = stream;

        this.startCountdown();
        return new Promise(resolve => video.onplaying = resolve);
      })
      .then(() =>
        this.startRecording(video.srcObject as MediaStream, this.question.duration_ms)
      )
      // stop recording
      .then(recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const url = window.URL.createObjectURL(recordedBlob); // blob url to retrieve video
        const file = new File([recordedBlob], 'video.webm');
        this.videoData = new FormData();
        this.videoData.append('file', file);

        console.log(this.videoData.get('file'));

        // stop the recording
        if (video.srcObject != null) {
          video.srcObject = null;
        }

        this.transferToPreview(url);

        // Storage
        this.question.video_url = url;
        this.question.video_form_data = this.videoData;
      });
  }

  transferToPreview(url: string) {
    const video = this.faceRecVideo.nativeElement;
    video.src = url;
    video.controls = true;
    document.getElementById('preview').innerHTML = 'Preview';
    document.getElementById('startBtn').setAttribute('disabled', 'false');
    document.getElementById('startBtn').innerHTML = 'Restart';
  }

  startCountdown() {
    this.countdown.percent = 100;
    this.countdown.animationDuration = this.question.duration_ms;
    this.countdown.render();
  }
}
