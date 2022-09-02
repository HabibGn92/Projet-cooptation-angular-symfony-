import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from './pages/error404/error404.component';
import { LoginUserComponent } from './core/login/login.component';
import { CooptationListComponent } from './core/cooptation-list/cooptation-list.component';              
import { AuthGuardService as AuthGuard  } from './core/services/auth-guard.service';
import { CooptationRequestComponent } from './components/cooptation-request/cooptation-request.component';
import { RoleGuardService as RoleGuard } from './core/services/role-guard.service';
import { CooptationEditComponent } from './components/cooptation-edit/cooptation-edit.component';
import { AdminCooptationComponent } from './core/admin-cooptation/admin-cooptation.component';
import { CooptationViewComponent } from './components/cooptation-view/cooptation-view.component';

import { TableHeaderComponent } from './core/manager-cooptation/table-header/table-header.component';



const routes: Routes = [
  { path: '', component: LoginUserComponent },
  { path:'cooptation/:id' , component:CooptationEditComponent, canActivate:[AuthGuard]  },
  { path:'cooptation/view/:id' , component:CooptationViewComponent ,canActivate:[AuthGuard]},
  { path:'cooptation', component:CooptationRequestComponent ,
  canActivate: [AuthGuard] },
  { path:'cooptation-list', component:CooptationListComponent  ,
  canActivate: [AuthGuard]},
  { path:'manager', component:TableHeaderComponent  ,
  canActivate: [RoleGuard] ,data: { 
    expectedRole: 'ROLE_MANAGER'
  }},

  { path:'admin', component:AdminCooptationComponent  ,
  canActivate: [RoleGuard] ,data: { 
    expectedRole: 'ROLE_ADMIN'
  }},
  {path: '**', component: Error404Component},   
 
              ];
@NgModule({
  imports: [RouterModule.forRoot(routes, {scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
