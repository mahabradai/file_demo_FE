import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UploadFile } from './UploadFile';

@Injectable({
  providedIn: 'root'
})
export class UploadFileService {

  private uploadUrl = '/uploadFile';
  private downloadUrl = '/downloadFile';

  constructor(private http: HttpClient) { }

  uploadFile(file: File): Observable<UploadFile> {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<UploadFile>(this.uploadUrl, formData);
  }

  uploadMultipleFiles(files: File[]): Observable<UploadFile[]> {
    const formData = new FormData();
    files.forEach(file => {
      formData.append('files', file);
    });

    return this.http.post<UploadFile[]>(this.uploadUrl, formData);
  }

  downloadFile(fileName: string): Observable<Blob> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/octet-stream'
    });

    return this.http.get(`${this.downloadUrl}/${fileName}`, {
      headers,
      responseType: 'blob'
    });
  }
}
