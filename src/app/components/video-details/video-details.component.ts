import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VideoService } from '../../services/VideoService.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-video-details',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.css']
})
export class VideoDetailsComponent implements OnInit {
  video: any = null;

  constructor(private route: ActivatedRoute, private videoService: VideoService) {}

  ngOnInit() {
    const id = +this.route.snapshot.paramMap.get('id')!;
    this.videoService.incrementViews(id).subscribe(() => {
      this.videoService.getVideoById(id).subscribe((data) => {
        this.video = data;
      });
    });
  }
}








