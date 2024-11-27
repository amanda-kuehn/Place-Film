import { Component, OnInit } from '@angular/core';
import { VideoService } from '../../services/VideoService.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule, RouterModule, HeaderComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  videos: any[] = [];
  filteredVideos: any[] = [];

  constructor(
    private videoService: VideoService,
    private route: ActivatedRoute
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
}






















