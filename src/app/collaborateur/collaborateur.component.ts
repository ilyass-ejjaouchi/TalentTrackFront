import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { AddCollaborateurComponent } from "./add-collaborateur/add-collaborateur.component";
import { ConfirmationDialogComponent } from "../confirmation-dialog/confirmation-dialog.component";
import {UserService} from "../services/UserService";
import {Subscription} from "rxjs";
import {ExportService} from "../services/ExportService";

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit{

  @Input() personnes!: any[];
  @Input() detailsMode: boolean = false;
  collaboratorAddedSubscription!: Subscription;
  searchTerm: string = '';

  constructor(private dialog: MatDialog,
              private exportService: ExportService,
              private userService: UserService) { }

  ngOnInit(): void {
    this.loadCollaborateurs();
    this.collaboratorAddedSubscription = this.userService.getCollaboratorAddedNotifier().subscribe(() => {
      this.loadCollaborateurs();
    });
  }

  loadCollaborateurs() {
    this.userService.getUsersByRole('COLLABORATEUR').subscribe(personnes => {
      this.personnes = personnes.filter((personne: any) =>
        personne.nom.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        personne.prenom.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    });
  }

  ajouterCollaborateur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "90%";
    dialogConfig.width = "70%";
    dialogConfig.data = {
      personne: null,
      readOnly: false,
      addMode: true
    };
    const modalDialog = this.dialog.open(AddCollaborateurComponent, dialogConfig);
  }

  confirmDelete(personne: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '30%',
      data: { nom: personne.nom, prenom: personne.prenom }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'oui') {
        // Handle deletion here
      }
    });
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
    const modalDialog = this.dialog.open(AddCollaborateurComponent, dialogConfig);
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
    const modalDialog = this.dialog.open(AddCollaborateurComponent, dialogConfig);

    modalDialog.afterClosed().subscribe(updatedPersonne => {
      if (updatedPersonne) {
        // Handle update logic here
        console.log('Updated collaborator:', updatedPersonne);
      }
    });
  }
  downloadUsers() {
    this.exportService.exportUsersByRoleToExcel('COLLABORATEUR')
      .subscribe((response: Blob) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'users.xlsx');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }, error => {
        console.error('Error downloading users:', error);
      });
  }

  searchCollab() {
    this.loadCollaborateurs();
  }
}
