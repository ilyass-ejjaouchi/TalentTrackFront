import { Component, OnInit } from '@angular/core';
import {MatDialog, MatDialogConfig} from '@angular/material/dialog';
import {AddCollaborateurComponent} from "./add-collaborateur/add-collaborateur.component";
import {ConfirmationDialogComponent} from "./confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-collaborateur',
  templateUrl: './collaborateur.component.html',
  styleUrls: ['./collaborateur.component.css']
})
export class CollaborateurComponent implements OnInit {

  personnes = [
    { nom: 'Doe', prenom: 'John', titre: 'Ingénieur de développement', diplome: 'Diplôme d’ingénieur en informatique' },
    { nom: 'Doe', prenom: 'John', titre: 'Ingénieur de développement', diplome: 'Diplôme d’ingénieur en informatique' },
    { nom: 'Doe', prenom: 'John', titre: 'Ingénieur de développement', diplome: 'Diplôme d’ingénieur en informatique' },
    // ... other personnes
  ];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
  }
  ajouterCollaborateur() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.height = "40%";
    dialogConfig.width = "50%";
    dialogConfig.id = "dialog-add-signalement";
    const modalDialog = this.dialog.open(AddCollaborateurComponent, dialogConfig);
  }

  confirmDelete(personne: any): void {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '250px',
      data: { nom: personne.nom, prenom: personne.prenom }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'oui') {
        // Handle deletion here
      }
    });
  }
}
