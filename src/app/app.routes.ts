import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideoDetailsComponent } from './components/video-details/video-details.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'video/:id', component: VideoDetailsComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];













