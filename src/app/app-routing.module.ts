import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProjectDetailsComponent } from './project-details/project-details.component';
import{ SelectProjectComponent } from './select-project/select-project.component';

const routes: Routes = [
  //{path:'', component:ProjectDetailsComponent},
  {path:'', redirectTo:'/project', pathMatch:'full'},
  {path:'project/:id', component:ProjectDetailsComponent},
  {path:'**', component:SelectProjectComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ProjectDetailsComponent, SelectProjectComponent]
