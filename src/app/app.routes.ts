import { Routes } from '@angular/router';
import { UploadComponent } from './component/upload/upload.component';
import { AnalysisResultsComponent } from './component/analysis-results/analysis-results.component';
import { ImprovementComponent } from './component/improvement/improvement.component';

export const routes: Routes = [
  { path: '', redirectTo: '/upload', pathMatch: 'full' },
  { path: 'upload', component: UploadComponent },
  { path: 'results', component: AnalysisResultsComponent },
  { path: 'improve', component: ImprovementComponent },
  { path: '**', redirectTo: '/upload' }
];