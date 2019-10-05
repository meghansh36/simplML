import { Routes } from "@angular/router";

import { DashboardComponent } from "../../pages/dashboard/dashboard.component";
import { PlaygroundComponent } from 'src/app/pages/playground/playground.component';

export const AdminLayoutRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: "dashboard", component: DashboardComponent
      },
      { path: "playground", component: PlaygroundComponent },
    ]
  },
];
