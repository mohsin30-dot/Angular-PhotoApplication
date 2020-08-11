import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../environments/environment.prod';
import { Album } from './Album';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlbumService {

  constructor(public http: HttpClient, private router: Router) { }

  saveAlbum(albumTitle: string, fileId: string) {

    var album: Album ={
      coverPhotoUrl: environment.API_BASE_URL +"files/show/" + fileId,
      createdBy: "",
      creationDate: "",
      id: "",
      title: albumTitle
    };

    var headers = this.getHeaders();

    this.http.post(environment.API_BASE_URL + "albums", album, { headers })
      .subscribe(
        albumResponse => {
          console.log("Album created: ", albumResponse);

          var album: Album = <Album>(albumResponse);
          var albumId = album.id;

          this.router.navigate(['album', albumId]);

        });

  }

  getAllAlbums() {
    var headers = this.getHeaders();
    console.log("Calling all Albums with headers: ", headers);
    return this.http.get(environment.API_BASE_URL + "albums/all", { headers });
    
  }

  getHeaders() {
    var headers = { 'idToken': localStorage.getItem('userIdToken') }
    return headers;
  }

  getPhotos(albumId: string) {
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "albums/" + albumId + "/photos", { headers });
  }

  getAllPhotos() {
    var headers = this.getHeaders();
    return this.http.get(environment.API_BASE_URL + "photos", { headers });
  }

  getAlbums() {
    var headers = this.getHeaders();
    console.log("Calling specific albums with headers: ", headers);
    return this.http.get(environment.API_BASE_URL + "albums", { headers });
  }


}
