import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { finalize } from 'rxjs/operators';


interface UploadedFile {
  name: string;
  url?: string;
  type: string;
}

@Component({
  selector: 'app-uploads',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './uploads.component.html',
  styleUrls: ['./uploads.component.css']
})
export class UploadsComponent {
  selectedFile: File | null = null;
  uploading = false;
  uploadedFiles: UploadedFile[] = [];

  constructor(
    private http: HttpClient,
    private cdr: ChangeDetectorRef
  ) {
    // 🔄 carrega arquivos persistidos
    const saved = localStorage.getItem('uploadedFiles');
    if (saved) {
      this.uploadedFiles = JSON.parse(saved);
    }
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.selectedFile = input.files[0];
    }
  }

  onUpload(): void {
    if (!this.selectedFile || this.uploading) return;

    this.uploading = true;

    const formData = new FormData();
    formData.append('file', this.selectedFile);

    this.http
      .post<any>('http://localhost:3000/upload', formData)
      .pipe(
        finalize(() => {
          this.uploading = false;
          this.cdr.detectChanges();
        })
      )
      .subscribe({
        next: (res) => {
          const newFile: UploadedFile = {
            name: res.name ?? this.selectedFile!.name,
            url: res.url,
            type: this.selectedFile!.type
          };

          this.uploadedFiles = [...this.uploadedFiles, newFile];

          localStorage.setItem(
            'uploadedFiles',
            JSON.stringify(this.uploadedFiles)
          );

          this.selectedFile = null;
        },
        error: (err) => {
          console.error('Erro ao enviar arquivo', err);
        }
      });
  }

}
