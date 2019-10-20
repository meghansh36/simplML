import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";

import { FooterComponent } from "./footer/footer.component";
import { NavbarComponent } from "./navbar/navbar.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { InputformComponent } from './inputform/inputform.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingComponent } from './loading/loading.component';
import { UtilityModule } from '../utility/utility.module';
import { OutputComponent } from './output/output.component';

@NgModule({
  imports: [CommonModule, RouterModule, NgbModule, FormsModule, ReactiveFormsModule, UtilityModule],
  declarations: [FooterComponent, NavbarComponent, SidebarComponent, InputformComponent, LoadingComponent, OutputComponent],
  exports: [FooterComponent, NavbarComponent, SidebarComponent]
})
export class ComponentsModule {}
