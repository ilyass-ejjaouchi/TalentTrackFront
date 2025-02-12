import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.css']
})

export class ConfirmationDialogComponent implements OnInit {
  message: string;
  nom: string;
  prenom: string;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.message = data.message;
    this.nom = data.nom;
    this.prenom = data.prenom;
  }

  ngOnInit(): void {
  }
}
