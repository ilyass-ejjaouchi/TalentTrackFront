import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DocumentsComponent} from "./documents/documents.component";
import {LoginComponent} from "./login/login.component";
import {CollaborateurComponent} from "./collaborateur/collaborateur.component";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {ProjetsComponent} from "./projets/projets.component";
import {AddDocumentsComponent} from "./documents/add-documents/add-documents.component";
import {AuthGuard} from "./AuthGuard";
import {ProjetDetailsComponent} from "./projets/projet-details/projet-details.component";
import {StagaireComponent} from "./stagaire/stagaire.component";
import {NotificationComponent} from "./notification/notification.component";

const routes: Routes = [
  { path: 'documents', component: DocumentsComponent, canActivate: [AuthGuard] },
  { path: 'upload', component: AddDocumentsComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'collaborateur', component: CollaborateurComponent, canActivate: [AuthGuard] },
  { path: 'stagiaire', component: StagaireComponent, canActivate: [AuthGuard] },
  { path: 'my-profile', component: MyProfileComponent, canActivate: [AuthGuard] },
  { path: 'projets', component: ProjetsComponent, canActivate: [AuthGuard] },
  { path: 'projets/:id', component: ProjetDetailsComponent, canActivate: [AuthGuard] },
  { path: 'notification', component: NotificationComponent, canActivate: [AuthGuard] },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
