import { Component, OnInit } from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";

@Component({
  selector: 'app-add-collaborateur',
  templateUrl: './add-collaborateur.component.html',
  styleUrls: ['./add-collaborateur.component.css']
})
export class AddCollaborateurComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AddCollaborateurComponent>) { }

  ngOnInit(): void {
  }

  fermer() {
    this.dialogRef.close();
  }
}
