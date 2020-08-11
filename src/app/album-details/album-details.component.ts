import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';
import { Router, ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { UserService } from '../user.service';
import { User } from '../User';

@Component({
  selector: 'app-album-details',
  templateUrl: './album-details.component.html',
  styleUrls: ['./album-details.component.css']
})
export class AlbumDetailsComponent implements OnInit {
  

  constructor(private albumService: AlbumService, private route: ActivatedRoute, private userService: UserService) { }

  albums: Album[];
  albumId: string;
  photos: Photo[];
  user: User;
  album: Album;

  ngOnInit(): void {
    console.log("calling albumService  from component.")
    this.albumService.getAllAlbums().subscribe(
      response => {
        this.albums = <Album[]>response;
        console.log("get all album respone", this.albums);

        this.albumService.getPhotos(this.albumId).subscribe(
          photos => {
            this.photos = <Photo[]>photos;
            console.log("Got the photos from the albums", this.photos);
          }
        );
      }
    );

    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      console.log('Got the album Id', this.albumId);
    });

    this.userService.getCurrentUserProfile()
      .subscribe(
        userProfie => {
          this.user = <User>userProfie;
          console.log("Got the user profile for background image ", this.user);
        }
    );

    this.albumService.getAlbums().subscribe(
      response => {
        this.album = <Album>response;
        console.log("Got the list of albums profile for background image ", this.album);
      }
    );
  }

 
}