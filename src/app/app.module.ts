import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {NavbarComponent} from './navbar/navbar.component';
import {DocumentsComponent} from './documents/documents.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {LoginComponent} from './login/login.component';
import {CollaborateurComponent} from './collaborateur/collaborateur.component';
import {AddCollaborateurComponent} from './collaborateur/add-collaborateur/add-collaborateur.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {ConfirmationDialogComponent} from './confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";
import {ProjetsComponent} from "./projets/projets.component";
import {ManageProjectComponent} from "./projets/manage-project/manage-project.component";
import {AddDocumentsComponent} from "./documents/add-documents/add-documents.component";
import {TokenInterceptor} from "./TokenInterceptor";
import {DocumentDialogComponent} from "./documents/document-dialog/document-dialog.component";
import {ProjetDetailsComponent} from "./projets/projet-details/projet-details.component";
import {MatTooltip} from "@angular/material/tooltip";
import {MyProfileComponent} from "./my-profile/my-profile.component";
import {StagaireComponent} from "./stagaire/stagaire.component";
import {ManageStagaireComponent} from "./stagaire/manage-stagaire/manage-stagaire.component";
import {NotificationComponent} from "./notification/notification.component";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DocumentsComponent,
    LoginComponent,
    CollaborateurComponent,
    AddCollaborateurComponent,
    ConfirmationDialogComponent,
    ProjetsComponent,
    ManageProjectComponent,
    AddDocumentsComponent,
    DocumentDialogComponent,
    ProjetDetailsComponent,
    MyProfileComponent,
    StagaireComponent,
    ManageStagaireComponent,
    NotificationComponent
  ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        HttpClientModule,
        BrowserAnimationsModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatTooltip
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
