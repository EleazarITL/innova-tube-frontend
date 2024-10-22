import { Component, OnInit } from '@angular/core';
import { VideosService } from '../shared/videos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {

  videos: any[] = [];
  searchQuery: string = '';
  maxResults: number = 5;
  order: string = 'viewCount';
  videoType: string = 'video';
  videoDuration: string = 'any';
  loading: boolean = false;

  constructor(private videosService: VideosService, private snackBar: MatSnackBar,) {}

  usuario_id = localStorage.getItem('usuario_id');

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(): void {
    this.loading = true;
    

    const filters = {
      part: 'snippet',
      maxResults: this.maxResults,
      order: this.order,
      q: this.searchQuery,
      type: this.videoType,
      videoDuration: this.videoDuration
    };

    this.videosService.searchVideos(filters).subscribe((respuesta) => {
      if (respuesta.success === true) {
        this.videos = respuesta.data.items;
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error.error.message, "Entendido");
    })
  }

  agregarFavoritos(video, caracteristicas) {
    let body = {
      usuario_id: this.usuario_id,
      video_id: video.videoId,
      titulo: caracteristicas.title,
      descripcion: caracteristicas.description,
      url: caracteristicas.thumbnails.medium.url
    }
    this.videosService.agregarFavoritos(body).subscribe((respuesta) => {
      if (respuesta.success === true) {
        this.snackBar.open(respuesta.message, "Entendido");
      }
    }, (error) => {
      this.snackBar.open(error.error.message, "Entendido");
    })
    
  }
}
