import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class VideoService {
  private baseUrl: string = 'http://localhost:3000';
  private filteredVideosSubject: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);
  filteredVideos$: Observable<any[]> = this.filteredVideosSubject.asObservable();

  constructor(private http: HttpClient) {}

  getPopularVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/videos?_sort=views&_order=desc`);
  }

  getVideoById(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/videos/${id}`);
  }

  incrementViews(id: number): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/videos/${id}`).pipe(
      switchMap((video) => {
        const updatedVideo = { ...video, views: video.views + 1 };
        return this.http.put<any>(`${this.baseUrl}/videos/${id}`, updatedVideo);
      })
    );
  }

  searchVideos(query: string): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/videos?q=${query}`);
  }

  getCategories(): Observable<string[]> {
    return this.http.get<string[]>(`${this.baseUrl}/categories`);
  }

  getVideos(): Observable<any[]> {
    return this.http.get<any[]>(`${this.baseUrl}/videos`);
  }

  getVideosByCategory(category: string): Observable<any[]> {
    const url = `${this.baseUrl}/videos?category=${category}`;
    console.log('URL chamada:', url);
    return this.http.get<any[]>(url);
  }

  updateFilteredVideos(videos: any[]): void {
    this.filteredVideosSubject.next(videos);
  }
}



