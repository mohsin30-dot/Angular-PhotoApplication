import { Component, OnInit } from '@angular/core';
import { PhotoService } from '../photo.service';
import { AlbumService } from '../album.service';
import { ActivatedRoute } from '@angular/router';
import { Photo } from '../Photo';
import { Album } from '../Album';

@Component({
  selector: 'app-photo-details',
  templateUrl: './photo-details.component.html',
  styleUrls: ['./photo-details.component.css']
})
export class PhotoDetailsComponent implements OnInit {

  constructor(public albumService: AlbumService, private route: ActivatedRoute, private photoService: PhotoService) { }

  photoId: string;
  photo: Photo;
  allComments: Comment[];
  album: Album;

  newComment: string;
  inOrder = false;

  changeOrder() {
    if (this.inOrder) {
      this.loadAllComments(this.photoId);
      return this.inOrder = false;
    } else {
      this.photoService.getComments(this.photoId).subscribe(
        response => {
          this.allComments = <Comment[]>response;
          console.log("Reverse: ", response);
        }
      );

      return this.inOrder = true;
    }
    
  }

  ngOnInit(): void {
  
    this.route.paramMap.subscribe(
      params => {
        this.photoId = params.get('photoId');
        console.log('Got the photo Id', this.photoId);
        this.loadPhoto(this.photoId);
        this.loadAllComments(this.photoId);
      }
    );

    
  }

  saveComment() {
    this.photoService.saveComment(this.photoId, this.newComment)
      .subscribe(
        response => {
          console.log("Comment added!", response);
          this.loadAllComments(this.photoId);
          this.newComment = "";
        }
      );
    
  }

  loadPhoto(photoId: string) {
    this.photoService.getPhoto(photoId).subscribe(
      photo => {
        this.photo = <Photo>photo;
        console.log("Loaded phto to photo details", this.photo);
      }
    );
  }

  loadAllComments(photoId: string) {
    this.photoService.getComments(photoId).subscribe(
      comments => {
        this.allComments = (<Comment[]>comments).reverse();
        console.log("All comments loaded to photo details", this.allComments);
      }
    );
  }

  makeProfilePhoto() {
    this.photoService.makeProfilePhoto(this.photo.photoUrl).subscribe(
      response => {
        console.log("profile photo update ", response);
      }
    );
  }

  makeCoverPhoto() {
    this.photoService.makeCoverPhoto(this.photo.photoUrl, this.photo.albumId).subscribe(
      response => {
        console.log("album cover update ", response);
      }
    );
  }
}