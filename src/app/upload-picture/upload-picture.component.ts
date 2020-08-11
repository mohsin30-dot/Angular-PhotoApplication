import { Component, OnInit, Injectable } from '@angular/core';
import { AlbumService } from '../album.service';
import { Album } from '../Album';
import { Router, ActivatedRoute } from '@angular/router';
import { AlbumDetailsComponent } from '../album-details/album-details.component';
import { PhotoService } from '../photo.service';
import { FileService } from '../file.service';


@Component({
  selector: 'app-upload-picture',
  templateUrl: './upload-picture.component.html',
  styleUrls: ['./upload-picture.component.css']
})
export class UploadPictureComponent implements OnInit {


  constructor(private route: ActivatedRoute, private router: Router, private photoService: PhotoService, private fileService: FileService) { }

  albumId: string;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      this.albumId = params.get('albumId');
      console.log('Upload get album Id:', this.albumId);
    });
  }

  goBack() {
    this.router.navigate(['/album', this.albumId]);
  }

  savePhoto(file: File) {
    console.log("File: ", file);

    this.fileService.uploadFile(file).subscribe(
      fileResponse => {
        var fileId = fileResponse["fileId"];
        console.log("File data from fileService: ", fileResponse["fileId"]);
        this.photoService.savePhoto(this.albumId, fileId);
      }
    );

    
  }
 

}
