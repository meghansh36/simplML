import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PlaygroundComponent } from 'src/app/pages/playground/playground.component';
import { UtilityModule } from 'src/app/utility/utility.module';
import { DesignPipelineComponent } from 'src/app/pages/design-pipeline/design-pipeline.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    UtilityModule,

  ],
  declarations: [
    DashboardComponent,
    PlaygroundComponent,
    DesignPipelineComponent
  ]
})
export class AdminLayoutModule { }
