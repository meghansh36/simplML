import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  public lottieConfig: Object;
  public showPipelineDesigner: boolean;
  ngOnInit(): void {
  }

  constructor() {
    this.lottieConfig = {
      path: 'assets/anim/anim-1.json',
      renderer: 'canvas',
      autoplay: true,
      loop: true
    };
    this.showPipelineDesigner = false;
  }

  buildPlayground() {
    this.showPipelineDesigner = true;
  }

}
