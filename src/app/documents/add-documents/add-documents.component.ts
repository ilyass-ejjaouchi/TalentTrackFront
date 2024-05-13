import {Component, OnInit} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {API_URL} from "../../constants";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmationDialogComponent} from "../../confirmation-dialog/confirmation-dialog.component";

@Component({
  selector: 'app-add-documents',
  templateUrl: './add-documents.component.html',
  styleUrls: ['./add-documents.component.css']
})
export class AddDocumentsComponent implements OnInit {
  selectedFileName: string | null = null;
  selectedDocumentType: string | null = null;
  fileToUpload: File | null = null;
  userDocuments: any[] = [];


  constructor(private http: HttpClient, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.getUserDocuments();
  }

  openFilePicker(): void {
    const fileInput = document.getElementById('fileInput');
    if (fileInput) {
      fileInput.click();
    }
  }

  onFileSelected(event: any): void {
    const selectedFile = event?.target?.files[0];
    if (selectedFile) {
      const fileType = selectedFile.name.split('.').pop()?.toLowerCase();
      if (fileType === 'pdf') {
        this.selectedFileName = selectedFile.name;
        this.fileToUpload = selectedFile;
      } else {
        alert('Please select a .pdf file.');
      }
    }
  }

  uploadFileToServer(): void {
    if (this.fileToUpload && this.selectedDocumentType) {
      const formData = new FormData();
      formData.append('file', this.fileToUpload);
      formData.append('documentType', this.selectedDocumentType);
      this.http.post(`${API_URL}/api/v1/documents/upload`, formData, { responseType: 'text' }).subscribe(
        response => {
          console.log(response);
          this.getUserDocuments();
          alert('File uploaded successfully: ' + response);
          this.selectedFileName = null;
          this.selectedDocumentType = null;
          this.fileToUpload = null;
        },
        error => {
          console.error(error);
          alert('Failed to upload file.');
        }
      );
    } else {
      alert('Please select both a file and a document type to upload.');
    }
  }

  getUserDocuments(): void {
    this.http.get<any[]>(`${API_URL}/api/v1/documents/user-documents`).subscribe(
      response => {
        this.userDocuments = response;
      },
      error => {
        console.error(error);
        alert('Failed to retrieve user documents.');
      }
    );
  }

  deleteDocument(id: any) {
    const documentToDelete = this.userDocuments.find(doc => doc.id === id);
    if (documentToDelete) {
      const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
        data: {
          message: 'Êtes-vous sûr de vouloir supprimer le document :',
          nom: documentToDelete.nom,
          prenom: documentToDelete.prenom
        }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'oui') {
          this.performDocumentDeletion(id);
        }
      });
    }
  }
  performDocumentDeletion(id: any): void {
    this.http.delete(`${API_URL}/api/v1/documents/delete/${id}`, { responseType: 'text' }).subscribe(
      response => {
        console.log('Delete response:', response);
        this.getUserDocuments();
        alert('Document deleted successfully.');
      },
      error => {
        console.error(error);
        alert('Failed to delete document.');
      }
    );
  }



  viewDocument(id: any): void {
    const documentUrl = `${API_URL}/api/v1/documents/view/${id}`;
    window.open(documentUrl, '_blank');
  }

}
