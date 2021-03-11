import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonButton } from '@ionic/angular';
import { VideoQuestionComponent } from '../components/video-question-component/video-question.component';
import { VideoQuestion } from '../constants';
import { UploadService } from '../upload.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit, AfterViewInit {
  @ViewChild('backBtn') backBtn: IonButton;
  @ViewChild('nextBtn') nextBtn: IonButton;
  public currentPageIndex = 0;
  public totalPageCount;
  public pageArray;
  private userEmailAddress;
  public userId = -1;
  public videoQuestions: Array<VideoQuestion> = [];

  constructor(private uploadService: UploadService) {
  }

  async ngOnInit(): Promise<void> {

    await this.loadVideoQuestions();

    this.totalPageCount = this.videoQuestions.length + 2;
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
    const res = await this.uploadService.getAllVideoQuestions();
    res.forEach(data => {
      const questionToPush: VideoQuestion =
      {
        videoTypeId: data.video_type_id, // from backend
        description: data.video_type_content, // from backend
        videoUrl: null,
        durationMS: 1000
      };

      this.videoQuestions.push(questionToPush);
    });
  }

  public async next(): Promise<void> {
    let canNext = true;
    // retrieve potential email in user agreement page and disable back button
    if (this.currentPageIndex == 1) {
      this.backBtn.disabled = true;
      // add user id
      this.userId = await this.uploadService.addUserRecord(this.userEmailAddress);
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

    // reach the end
    if (this.currentPageIndex == this.totalPageCount - 1) {
      // this.nextBtn.disabled = true;
      document.getElementById('nextBtn').innerHTML = "Submit";
      this.submit();
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

  public submit(): void {
    console.log(this.videoQuestions);
  }
}
