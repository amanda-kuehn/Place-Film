import { Component, Inject, OnInit } from '@angular/core';
import { DOCUMENT, CommonModule, AsyncPipe } from '@angular/common';
import { AuthService, User } from '@auth0/auth0-angular';
import { FormsModule } from '@angular/forms';
import { VideoService } from '../../services/VideoService.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, FormsModule, AsyncPipe],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  searchQuery = '';
  selectedCategory = '';
  categories: any[] = [];
  profile!: User | null | undefined;

  constructor(
    public auth: AuthService,
    private videoService: VideoService,
    @Inject(DOCUMENT) private document: Document,
    private router: Router
  ) {}

  ngOnInit() {
    this.videoService.getCategories().subscribe((data: any[]) => {
      this.categories = data;
      console.log('Categorias carregadas:', this.categories);
    });
    this.auth.user$.subscribe((profile) => {
      this.profile = profile;
    });
  }

  filterVideos() {
    const selectedCategoryName = this.categories.find(category => category.id === this.selectedCategory)?.name || '';
    console.log('Categoria selecionada:', selectedCategoryName);
    if (selectedCategoryName) {
      this.videoService.getVideosByCategory(selectedCategoryName).subscribe((videos) => {
        console.log('Vídeos filtrados:', videos);
        this.videoService.updateFilteredVideos(videos);
      });
    } else {
      this.router.navigate(['/'], { queryParams: { search: this.searchQuery } });
    }
  }

  login() {
    this.auth.loginWithRedirect();
  }

  logout() {
    this.auth.logout({
      logoutParams: { returnTo: this.document.location.origin },
    });
  }

  goBack(): void {
    this.router.navigate(['/']); // Altere para a rota que deseja retornar
  }
}















