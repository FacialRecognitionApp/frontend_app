import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { VideoQuestionComponent } from '../components/video-question-component/video-question.component';
import { IntroductionComponent } from '../components/introduction-component/introduction.component';
import { UserAgreementComponent } from '../components/user-agreement-component/user-agreement.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { SurveyQuestionComponent } from '../components/survey-question-component/survey-question.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [HomePage, VideoQuestionComponent, IntroductionComponent, UserAgreementComponent, SurveyQuestionComponent]
})
export class HomePageModule {}
