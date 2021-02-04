import { Routes } from "@angular/router";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { LoginComponent } from "./login/login.component";
import { RegistrationComponent } from "./registration/registration.component";

export const appRoutes:Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'registration', component: RegistrationComponent },
    { path: 'dashboard', component: DashboardComponent },
    { path: '', redirectTo: '/login', pathMatch: 'full' }
]