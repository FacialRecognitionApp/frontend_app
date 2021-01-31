import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild('faceRecVideo')
  private faceRecVideo: ElementRef;
  public recording;

  public recordingTimeMS = 5000; // 5s recording time

  public videoUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit() {
    this.recording = document.getElementById("recording");
    this.recordingTimeMS = 5000;
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
    const video: HTMLVideoElement = this.faceRecVideo.nativeElement;

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
        this.recording.src = url;

        console.log(url);
        this.videoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(url);

        console.log("Successfully recorded " + recordedBlob.size + " bytes of " +
          recordedBlob.type + " media.");

        this.stopButtonEvent();
      });
  }

  stopButtonEvent() {
    const video = this.faceRecVideo.nativeElement;
    // stop the recording
    video.srcObject.getTracks().forEach(track => track.stop());
  }

}
