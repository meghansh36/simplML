import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimViewComponent } from './anim-view/anim-view.component';
import { LottieAnimationViewModule } from 'ng-lottie';

@NgModule({
  declarations: [AnimViewComponent],
  imports: [
    CommonModule,
    LottieAnimationViewModule.forRoot()
  ],
  exports:[AnimViewComponent]
})
export class UtilityModule { }
