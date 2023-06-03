import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  singleFileUploadInput!: HTMLInputElement;
  singleFileUploadError!: HTMLElement;
  singleFileUploadSuccess!: HTMLElement;

  multipleFileUploadInput!: HTMLInputElement;
  multipleFileUploadError!: HTMLElement;
  multipleFileUploadSuccess!: HTMLElement;

  constructor() { }

  ngOnInit() {
    this.singleFileUploadInput = document.querySelector('#singleFileUploadInput') as HTMLInputElement;
    this.singleFileUploadError = document.querySelector('#singleFileUploadError') as HTMLElement;
    this.singleFileUploadSuccess = document.querySelector('#singleFileUploadSuccess') as HTMLElement;

    this.multipleFileUploadInput = document.querySelector('#multipleFileUploadInput') as HTMLInputElement;
    this.multipleFileUploadError = document.querySelector('#multipleFileUploadError') as HTMLElement;
    this.multipleFileUploadSuccess = document.querySelector('#multipleFileUploadSuccess') as HTMLElement;
  }

  uploadSingleFile(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadFile");

    xhr.onload = () => {
      console.log(xhr.responseText);
      const response = JSON.parse(xhr.responseText);
      if (xhr.status == 200) {
        if (this.singleFileUploadError) {
          this.singleFileUploadError.style.display = "none";
        }
        if (this.singleFileUploadSuccess) {
          this.singleFileUploadSuccess.innerHTML = "<p>File Uploaded Successfully.</p><p>DownloadUrl : <a href='" + response.fileDownloadUri + "' target='_blank'>" + response.fileDownloadUri + "</a></p>";
          this.singleFileUploadSuccess.style.display = "block";
        }
      } else {
        if (this.singleFileUploadSuccess) {
          this.singleFileUploadSuccess.style.display = "none";
        }
        if (this.singleFileUploadError) {
          this.singleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
      }
    };

    xhr.send(formData);
  }

  uploadMultipleFiles(files: FileList) {
    const formData = new FormData();
    for (let index = 0; index < files.length; index++) {
      formData.append("files", files[index]);
    }

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/uploadMultipleFiles");

    xhr.onload = () => {
      console.log(xhr.responseText);
      const response = JSON.parse(xhr.responseText);
      if (xhr.status == 200) {
        if (this.multipleFileUploadError) {
          this.multipleFileUploadError.style.display = "none";
        }
        if (this.multipleFileUploadSuccess) {
          let content = "<p>All Files Uploaded Successfully</p>";
          for (let i = 0; i < response.length; i++) {
            content += "<p>DownloadUrl : <a href='" + response[i].fileDownloadUri + "' target='_blank'>" + response[i].fileDownloadUri + "</a></p>";
          }
          this.multipleFileUploadSuccess.innerHTML = content;
          this.multipleFileUploadSuccess.style.display = "block";
        }
      } else {
        if (this.multipleFileUploadSuccess) {
          this.multipleFileUploadSuccess.style.display = "none";
        }
        if (this.multipleFileUploadError) {
          this.multipleFileUploadError.innerHTML = (response && response.message) || "Some Error Occurred";
        }
     
      }
    };

    xhr.send(formData);
  }

  onSubmitSingleUploadForm(event: Event) {
    const files = this.singleFileUploadInput?.files;
    if (files && files.length === 0) {
      if (this.singleFileUploadError) {
        this.singleFileUploadError.innerHTML = "Please select a file";
        this.singleFileUploadError.style.display = "block";
      }
    }
    if (files) {
      this.uploadSingleFile(files[0]);
    }
    event.preventDefault();
  }

  onSubmitMultipleUploadForm(event: Event) {
    const files = this.multipleFileUploadInput?.files;
    if (files && files.length === 0) {
      if (this.multipleFileUploadError) {
        this.multipleFileUploadError.innerHTML = "Please select at least one file";
        this.multipleFileUploadError.style.display = "block";
      }
    }
    if (files) {
      this.uploadMultipleFiles(files);
    }
    event.preventDefault();
  }
}
