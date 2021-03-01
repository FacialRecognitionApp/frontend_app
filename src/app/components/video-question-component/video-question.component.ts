import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { IonButton } from '@ionic/angular';
import { Question } from 'src/app/home/home.page';
import { UploadService } from 'src/app/upload.service';

@Component({
  selector: 'video-question',
  templateUrl: './video-question.component.html',
  styleUrls: ['./video-question.component.scss'],
})
export class VideoQuestionComponent implements OnInit {
  @Input() question: Question;

  @ViewChild('faceRecVideo')
  private faceRecVideo: ElementRef;

  private recordingTimeMS = 1000; // 1s recording time
  private videoData: FormData;

  constructor(private sanitizer: DomSanitizer, private uploadService: UploadService) { }

  ngOnInit() {
    console.log(1);
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
        return new Promise(resolve => video.onplaying = resolve);
      })
      .then(() =>
        this.startRecording(video.srcObject as MediaStream, this.recordingTimeMS)
      )
      // stop recording
      .then(recordedChunks => {
        let recordedBlob = new Blob(recordedChunks, { type: "video/webm" });
        const url = window.URL.createObjectURL(recordedBlob); // blob url to retrieve video
        const file = new File([recordedBlob], 'video.webm');
        this.videoData = new FormData();
        this.videoData.append('file', file);
        console.log(this.videoData);

        // stop the recording
        if (video.srcObject != null) {
          video.srcObject = null;
        }
        video.src = url;
        video.controls = true;
        document.getElementById('preview').innerHTML = 'Preview';
        document.getElementById('startBtn').setAttribute('disabled', 'false');
        document.getElementById('startBtn').innerHTML = 'Restart';

        this.question.answerData = this.videoData;
      });
  }



  // upload to server test
  uploadVideo() {
    console.log(this.videoData);
    this.uploadService.uploadVideo(this.videoData);
  }
}
