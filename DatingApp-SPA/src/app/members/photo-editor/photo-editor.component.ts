import { Component, Input, OnInit } from '@angular/core';
import { FileUploader } from 'ng2-file-upload';
import { Observable } from 'rxjs';
import { flatMap, mergeMap } from 'rxjs/operators';
import { Photo } from 'src/app/_models/photo';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AuthService } from 'src/app/_services/auth.service';
import { UserService } from 'src/app/_services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() photos: Photo[];

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean;
  baseUrl = environment.apiUrl;
  currentMain: Photo;

  constructor(private authService: AuthService,
    // new idea
    private userServices: UserService, private alertify: AlertifyService) {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'users/' + this.authService.decodedToken.nameid + '/photos',
      authToken: 'Bearer ' + localStorage.getItem('token'),
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10*1024*1024,
    });
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    };
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        // new idea
        this.userServices.getUser(this.authService.decodedToken.nameid).subscribe(data => {
          this.alertify.success('photo uploaded');
          this.photos = data.photos;
        }, error => {
          this.alertify.error(error);
        });
        /* orginal code
        const res: Photo = JSON.parse(response);
        const photo = {
          id: res.id,
          url: res.url,
          dateAdded: res.dateAdded,
          description: res.description,
          isMain: res.isMain
        };
        this.photos.push(photo);
        */
      }
    };
    this.hasBaseDropZoneOver = false;
  }

  public fileOverBase(e: any): void {
    this.hasBaseDropZoneOver = e;
  }

  ngOnInit(): void {
  }

  setMainPhoto(photo: Photo) {
    //this.userServices.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(
    //  () => this.userServices.getUser(this.authService.decodedToken.nameid).subscribe(data => {
    //      this.alertify.success('main set done');
    //      this.photos  = data.photos;
    //    }, error => {
    //      this.alertify.error(error);
    //    })
    //  );
    this.userServices.setMainPhoto(this.authService.decodedToken.nameid, photo.id).subscribe(() => {
      this.currentMain = this.photos.filter(p =>p.isMain === true)[0];
      this.currentMain.isMain = false;
      photo.isMain = true;
    }, error => {
      this.alertify.error(error);
    });
  }

}
