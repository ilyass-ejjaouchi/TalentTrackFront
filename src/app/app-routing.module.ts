import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentsComponent} from "./documents/documents.component";
import {LoginComponent} from "./login/login.component";
import {CollaborateurComponent} from "./collaborateur/collaborateur.component";

const routes: Routes = [
  { path: '', redirectTo: '/documents', pathMatch: 'full' },
  { path: 'documents', component: DocumentsComponent },
  { path: 'login', component: LoginComponent },
  { path: 'collaborateur', component: CollaborateurComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
