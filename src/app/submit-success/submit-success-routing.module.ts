import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SubmitSuccessPage } from './submit-success.page';

const routes: Routes = [
  {
    path: '',
    component: SubmitSuccessPage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SubmitSuccessPageRoutingModule {}
