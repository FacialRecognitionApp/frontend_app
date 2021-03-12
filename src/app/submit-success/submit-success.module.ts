import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { SubmitSuccessPage } from './submit-success.page';
import { SubmitSuccessPageRoutingModule } from './submit-success-routing.module';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SubmitSuccessPageRoutingModule,
    NgCircleProgressModule.forRoot({})
  ],
  declarations: [SubmitSuccessPage]
})
export class SubmitSuccessPageModule {}
