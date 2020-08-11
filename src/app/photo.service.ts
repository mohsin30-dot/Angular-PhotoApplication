import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { environment } from '../environments/environment';
import { Comment } from './Comment';
import { Photo } from './Photo';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class PhotoService {

  constructor(public http: HttpClient, private router: Router) { }

  savePhoto(albumId: string, fileId: string) {

    var photo: Photo = {
      albumId: albumId,
      createdBy: "",
      dateCreated: "",
      fileId: fileId,
      id: "",
      photoUrl: environment.API_BASE_URL + "files/show/" + fileId,
      thumbnailUrl: environment.API_BASE_URL + "files/show/" + fileId
    }

    var headers = this.getHeaders();

    this.http.post(environment.API_BASE_URL + "photos", photo, { headers })
      .subscribe(
        photoResponse => {
          console.log("photo uploaded: ", photoResponse);

          var photo: Photo = <Photo>photoResponse;
          var albumId = photo.albumId;

          this.router.navigate(['album', albumId]);
        }
      );

  }

  saveComment(photoId: string, newComment: string) {

    var comment: Comment = {
      comment: newComment,
      createdBy: "",
      dateCreated: "",
      id: "",
      photoId: photoId
    };

    var headers = this.getHeaders();

    return this.http.post(environment.API_BASE_URL + "photos/comments", comment, { headers });
  }
 

  getHeaders() {
    var headers = {
      'idToken': localStorage.getItem('userIdToken')
    }
    return headers;
  }

  getPhoto(photoId: string) {
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "photos/" + photoId, { headers });
  }

  getComments(photoId: string) {
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "photos/" + photoId + "/comments", { headers });
  }

  makeProfilePhoto(photoUrl : string) {
    var headers = this.getHeaders();
    var params = new HttpParams().set('photoUrl', photoUrl);

    return this.http.put(environment.API_BASE_URL + "users/me/profilePhoto", params, { headers }); 

  }

  makeCoverPhoto(photoUrl: string, albumId: string) {
    var headers = this.getHeaders();
    var params = new HttpParams()
    .set('photoUrl', photoUrl)
    .set('id', albumId);


    return this.http.put(environment.API_BASE_URL + "albums/coverPhoto", params, { headers });

  }



}
