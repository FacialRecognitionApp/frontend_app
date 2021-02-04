import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';

import { HomePageRoutingModule } from './home-routing.module';
import { VideoQuestionComponent } from '../components/survey-question-components/video-question/video-question.component';
import { QuestionRenderComponent } from '../components/question-render-component/question-render/question-render.component';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule
  ],
  declarations: [HomePage, VideoQuestionComponent, QuestionRenderComponent]
})
export class HomePageModule {}
