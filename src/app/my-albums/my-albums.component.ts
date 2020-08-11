import { Component, OnInit } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';

@Component({
  selector: 'app-my-albums',
  templateUrl: './my-albums.component.html',
  styleUrls: ['./my-albums.component.css']
})
export class MyAlbumsComponent implements OnInit {

  constructor(private albumService: AlbumService) { }

  albums: Album[];

  ngOnInit(): void {
    this.albumService.getAlbums().subscribe(
      allAlbums => {
        this.albums = <Album[]>allAlbums;
        console.log("Get all albums in my albums", this.albums);
      }
    );
  }

}