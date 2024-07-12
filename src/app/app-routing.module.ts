import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { AdminPanelComponent } from './pages/admin-panel/admin-panel.component';
import { QuestionaireComponent } from './pages/questionaire/questionaire.component';

const routes: Routes = [
  {path:'',component:LoginComponent},
  {path:"adminpanel",component:AdminPanelComponent},
  {path:"questionaire",component:QuestionaireComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
