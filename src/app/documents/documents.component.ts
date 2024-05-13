import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthService} from "../services/AuthService";
import {HttpClient} from "@angular/common/http";
import {API_URL} from "../constants";
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import {DocumentDialogComponent} from "./document-dialog/document-dialog.component";

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrls: ['./documents.component.css']
})
export class DocumentsComponent implements OnInit {
  documents! : any;
  constructor(private router: Router, private auth: AuthService,
              private http: HttpClient, private dialog: MatDialog) { }


  ngOnInit(): void {
    this.getDocumentCounts();
  }


  getDocumentCounts(): void {
    this.http.get<any[]>(`${API_URL}/api/v1/documents/document-counts`).subscribe(
      response => {
        this.documents = response;
      },
      error => {
        console.error(error);
      }
    );
  }

  selectDocument(documentType: any): void {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = { documentType };
    dialogConfig.width = '80%';
    dialogConfig.height = '70%';

    const dialogRef = this.dialog.open(DocumentDialogComponent, dialogConfig);
  }
}
