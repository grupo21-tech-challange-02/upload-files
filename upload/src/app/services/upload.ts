import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface UploadedFile {
  name: string;
  url: string;
}

@Injectable({
  providedIn: 'root'
})
export class UploadService {
  constructor(private http: HttpClient) {}

  uploadFile(file: File): Observable<UploadedFile> {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<UploadedFile>('http://localhost:3000/upload', formData);
  }

  getFiles(): Observable<UploadedFile[]> {
    return this.http.get<UploadedFile[]>('http://localhost:3000/files');
  }
}
