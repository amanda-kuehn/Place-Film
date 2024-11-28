import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/VideoService.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { SafeUrlPipe } from '../../pipes/safe-url.pipe';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule, SafeUrlPipe],
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video: any = null;
  videoUrl: string = '';

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.videoService.incrementViews(id).subscribe(() => {
      this.videoService.getVideoById(id).subscribe((data) => {
        this.video = data;
        this.videoUrl = this.getSafeVideoUrl(this.video.url);
      });
    });
  }

  getSafeVideoUrl(url: string): string {
    return `https://www.youtube.com/embed/${this.extractVideoId(url)}`;
  }

  extractVideoId(url: string): string {
    const regExp = /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/ ]{11})/;
    const match = url.match(regExp);
    return match ? match[1] : '';
  }
}










