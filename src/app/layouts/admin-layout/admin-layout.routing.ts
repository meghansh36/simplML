import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { IconsComponent } from "../../pages/icons/icons.component";

export const AdminLayoutRoutes: Routes = [
  { path: "", component: DashboardComponent },
  { path: "icons", component: IconsComponent },
];
