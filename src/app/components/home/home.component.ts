import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/VideoService.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { RouterModule } from '@angular/router';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, MatDialogModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  filteredVideos: any[] = [];
  errorMessage: string | null = null;

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute,
    private auth: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.videoService.getVideos().subscribe((data: any[]) => {
      this.videos = data;
      this.filteredVideos = data;
    });

    this.videoService.filteredVideos$.subscribe((videos) => {
      this.filteredVideos = videos;
    });

    this.route.queryParams.subscribe((params: any) => {
      const searchQuery = params['search'] || '';
      const selectedCategory = params['category'] || '';
      this.applyFilters(searchQuery, selectedCategory);
    });
  }

  applyFilters(searchQuery: string, selectedCategory: string) {
    this.filteredVideos = this.videos.filter(video =>
      (!selectedCategory || video.category === selectedCategory) &&
      (!searchQuery || video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
       video.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  }

  onVideoSelect(videoId: number) {
    this.auth.isAuthenticated$.subscribe({
      next: (isAuthenticated) => {
        if (!isAuthenticated) {
          this.dialog.open(ErrorDialogComponent); // Exibir popup se não estiver autenticado
        } else {
          this.router.navigate(['/video', videoId]); // Navegar para o vídeo
        }
      },
      error: (err) => {
        console.error('Erro ao verificar autenticação:', err);
        this.dialog.open(ErrorDialogComponent); // Garantir que o popup seja exibido em caso de erro
      }
    });
  }
}























