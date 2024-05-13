import { Component } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import { UserService } from "../services/UserService";
import { Subscription } from "rxjs";
import { ExportService } from "../services/ExportService";
import {ManageStagaireComponent} from "./manage-stagaire/manage-stagaire.component";

@Component({
  selector: 'app-stagaire',
  templateUrl: './stagaire.component.html',
  styleUrls: ['./stagaire.component.css']
})
export class StagaireComponent {

  personnes!: any[];
  detailsMode: boolean = false;
  collaboratorAddedSubscription!: Subscription;
  searchTerm: string = '';

  constructor(private dialog: MatDialog,
              private exportService: ExportService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadStagiaires();
    this.collaboratorAddedSubscription = this.userService.getCollaboratorAddedNotifier().subscribe(() => {
      this.loadStagiaires();
    });
  }

  loadStagiaires() {
    this.userService.getUsersByRole('STAGAIRE').subscribe(personnes => {
      this.personnes = personnes.filter((personne: any) =>
        personne.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        personne.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  ajouterStagiaire() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "90%";
    dialogConfig.width = "70%";
    dialogConfig.data = {
      personne: null,
      readOnly: false,
      addMode: true
    };
    const modalDialog = this.dialog.open(ManageStagaireComponent, dialogConfig);
  }

  confirmRemoveAccess(personne: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30%',
      data: {
        nom: personne.nom,
        prenom: personne.prenom,
        message: 'removeAccess'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'oui') {
        // Handle action here
      }
    });
  }

  confirmGiveAccess(personne: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30%',
      data: {
        nom: personne.nom,
        prenom: personne.prenom,
        message: 'giveAccess'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'oui') {
        // Handle action here
      }
    });
  }

  viewDetails(personne: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "90%";
    dialogConfig.width = "70%";
    dialogConfig.data = {
      personne: personne,
      readOnly: true,
      addMode: false
    };
    const modalDialog = this.dialog.open(ManageStagaireComponent, dialogConfig);
  }

  editDetails(personne: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "90%";
    dialogConfig.width = "70%";
    dialogConfig.data = {
      personne: personne,
      readOnly: false,
      addMode: false
    };
    const modalDialog = this.dialog.open(ManageStagaireComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(updatedPersonne => {
      if (updatedPersonne) {
        // Handle update logic here
        console.log('Updated collaborator:', updatedPersonne);
      }
    });
  }

  downloadStagiaires() {
    this.exportService.exportUsersByRoleToExcel('STAGAIRE')
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'stagiaires.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, error => {
        console.error('Error downloading stagiaires:', error);
      });
  }

  searchStagiaire() {
    this.loadStagiaires();
  }
}
