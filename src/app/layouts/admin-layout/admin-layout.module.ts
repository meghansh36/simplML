import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";

import { AdminLayoutRoutes } from "./admin-layout.routing";
import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { NgDragDropModule } from 'ng-drag-drop';

import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { PlaygroundComponent } from 'src/app/pages/playground/playground.component';
import { UtilityModule } from 'src/app/utility/utility.module';
import { DesignPipelineComponent } from 'src/app/pages/design-pipeline/design-pipeline.component';
import { ComponentsModule } from 'src/app/components/components.module';
import { CommandPalleteComponent } from 'src/app/components/command-pallete/command-pallete.component';
import { InputformComponent } from 'src/app/components/inputform/inputform.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    UtilityModule,
    ComponentsModule,
    NgDragDropModule.forRoot()
  ],
  declarations: [
    DashboardComponent,
    PlaygroundComponent,
    DesignPipelineComponent,
    CommandPalleteComponent
  ],
  providers: [],
  entryComponents: [InputformComponent]
})
export class AdminLayoutModule { }
