import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { DocumentsComponent } from './documents/documents.component';
import {FormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import { LoginComponent } from './login/login.component';
import { CollaborateurComponent } from './collaborateur/collaborateur.component';
import { AddCollaborateurComponent } from './collaborateur/add-collaborateur/add-collaborateur.component';
import {MatDialogModule} from "@angular/material/dialog";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import { ConfirmationDialogComponent } from './collaborateur/confirmation-dialog/confirmation-dialog.component';
import {MatButtonModule} from "@angular/material/button";

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    DocumentsComponent,
    LoginComponent,
    CollaborateurComponent,
    AddCollaborateurComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatButtonModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
