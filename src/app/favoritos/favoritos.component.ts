import { Component, OnInit } from '@angular/core';
import { VideosService } from '../shared/videos.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-favoritos',
  templateUrl: './favoritos.component.html',
  styleUrl: './favoritos.component.css'
})
export class FavoritosComponent implements OnInit {

  videos: any[] = [];
  searchQuery: string = '';
  loading: boolean = false;
  usuario_id = localStorage.getItem('usuario_id');

  constructor(private videosService: VideosService, private snackBar: MatSnackBar,) {}

  ngOnInit(): void {
    this.searchVideos();
  }

  searchVideos(): void {
    this.loading = true;
    

    const filters = {
      titulo: this.searchQuery,
      usuario_id:this.usuario_id
    };

    this.videosService.searchFavoritos(filters).subscribe((respuesta) => {
      if (respuesta.success === true) {
        this.videos = respuesta.data;
        this.loading = false;
      }
    }, (error) => {
      this.loading = false;
      this.snackBar.open(error.error.message, "Entendido");
    });
  }

  eliminarFavoritos(video_id: any) {
    let body = {
      video_id: video_id,
      usuario_id: this.usuario_id
    }
    this.videosService.eliminarFavoritos(body).subscribe((respuesta) => {
      if (respuesta.success === true) {
        this.snackBar.open(respuesta.message, "Entendido");
        this.searchVideos();
      }
    }, (error) => {
      this.snackBar.open(error.error.message, "Entendido");
    })
  }
}
