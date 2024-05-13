import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { API_URL } from "../../constants";

@Component({
  selector: 'app-document-dialog',
  templateUrl: './document-dialog.component.html',
  styleUrls: ['./document-dialog.component.css']
})
export class DocumentDialogComponent {
  documents: any[] = [];

  constructor(
    private http: HttpClient,
    public dialogRef: MatDialogRef<DocumentDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.loadDocuments(data.documentType);
  }

  loadDocuments(documentType: any): void {
    this.http
      .get<any[]>(`${API_URL}/api/v1/documents?documentType=${documentType.key}`)
      .subscribe(
        (response) => {
          this.documents = response;
        },
        (error) => {
          console.error(error);
        }
      );
  }

  downloadDocuments(): void {
    const selectedDocumentIds = this.documents
      .filter(document => document.selected)
      .map(document => document.id);

    if (selectedDocumentIds.length === 0) {
      alert('Please select at least one document to download.');
      return;
    }

    const queryParams = selectedDocumentIds.map(id => `documentIds=${id}`).join('&');
    const downloadUrl = `${API_URL}/api/v1/documents/download?${queryParams}`;

    const httpOptions = {
      responseType: 'blob' as 'json',
      headers: new HttpHeaders({
        Accept: 'application/zip'
      })
    };

    this.http.get(downloadUrl, httpOptions)
      .subscribe(
        (response: any) => {
          const blob = new Blob([response], { type: 'application/zip' });
          const url = window.URL.createObjectURL(blob);
          const a = document.createElement('a');
          a.href = url;
          a.download = 'documents.zip';
          document.body.appendChild(a);
          a.click();
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        },
        (error) => {
          console.error(error);
          alert('Failed to download documents.');
        }
      );
    this.dialogRef.close();
  }

}
