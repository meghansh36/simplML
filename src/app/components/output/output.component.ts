import { Component, OnInit, AfterViewInit } from '@angular/core';
const introjs = require('../../../../node_modules/intro.js/intro')

@Component({
  selector: 'app-output',
  templateUrl: './output.component.html',
  styleUrls: ['./output.component.scss']
})
export class OutputComponent implements OnInit, AfterViewInit {

  passedData: any;
  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    this.introMethod();
  }

  introMethod() {
    let intro = introjs();

      let acc_text = `Accuracy is the most intuitive performance measure and it is simply a ratio of correctly predicted observation to the total observations. One may think that, if we have high accuracy then our model is best. Yes, accuracy is a great measure but only when you have symmetric datasets where values of false positive and false negatives are almost same. Therefore, you have to look at other parameters to evaluate the performance of your model. For your model, you have got ${this.passedData.accuracy} which means your model is approx. ${this.passedData.accuracy * 100}% accurate.`

      let pre_text = (this.passedData.precision > 0.6) ? (`Precision is the ratio of correctly predicted positive observations to the total predicted positive observations. High precision relates to the low false positive rate. You have got ${this.passedData.precision} precision which is pretty good.`) : (`Precision is the ratio of correctly predicted positive observations to the total predicted positive observations. High precision relates to the low false positive rate. You have got ${this.passedData.precision} precision which can be further improved. Try optimizing your model.`)

      let recall_text = (this.passedData.recall > 0.5) ? (`Recall is the ratio of correctly predicted positive observations to the all observations in actual class. You have got recall of ${this.passedData.recall} which is good for this model as it’s above 0.5.`) : (`Recall is the ratio of correctly predicted positive observations to the all observations in actual class. You have got recall of ${this.passedData.recall} which is not as good as it can be.`)

      let f1_text = `F1 Score is the weighted average of Precision and Recall. Therefore, this score takes both false positives and false negatives into account. Intuitively it is not as easy to understand as accuracy, but F1 is usually more useful than accuracy, especially if you have an uneven class distribution. Accuracy works best if false positives and false negatives have similar cost. If the cost of false positives and false negatives are very different, it’s better to look at both Precision and Recall. In your case, F1 score is ${this.passedData.f1_text}.`

      intro.setOptions({
        steps: [
        {
        intro: "Let us explain you the results of your awesome model"
        },
        {
        element: "#resultStep1",
        intro: acc_text,
        position: "right"
        },
        {
          element: "#resultStep1",
          intro: pre_text,
          position: "right"
        },
        {
          element: "#resultStep1",
          intro: recall_text,
          position: "right"
        },
        {
          element: "#resultStep1",
          intro: f1_text,
          position: "right"
        }
        ],
        showProgress: true,
        skipLabel: "Skip",
        doneLabel: "Done",
        nextLabel: "Next",
        prevLabel: "Previous",
        overlayOpacity: "0.8",
        highlightClass: "customOverlayClass"
        });
        intro.start();
  }


}
