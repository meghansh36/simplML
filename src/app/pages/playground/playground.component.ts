import { Component, OnInit } from '@angular/core';
import { RoutingService } from 'src/app/services/routing-service.service';


@Component({
  selector: 'app-playground',
  templateUrl: './playground.component.html',
  styleUrls: ['./playground.component.scss']
})
export class PlaygroundComponent implements OnInit {

  public showPipelineDesigner: boolean;
  constructor(private routingServie: RoutingService) {
    this.showPipelineDesigner = false;
  }

  ngOnInit(): void {
    this.routingServie.navTitleEmitter.next("Playground");
  }


  buildPlayground() {
    this.showPipelineDesigner = true;
  }

}
