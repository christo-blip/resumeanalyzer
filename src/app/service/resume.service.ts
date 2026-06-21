import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ResumeAnalysis} from "../models/resume/resume.module";
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ResumeService {
  private apiUrl = environment.apiUrl;

  private latestAnalysisSubject = new BehaviorSubject<ResumeAnalysis | null>(null);
  latestAnalysis$ = this.latestAnalysisSubject.asObservable();

  constructor(private http: HttpClient) { }

  analyzeTest(resumeText: string, jobDescription?: string): Observable<ResumeAnalysis> {
    return this.http.post<ResumeAnalysis>(`${this.apiUrl}/analyze`, { 
      resumeText, jobDescription 
    }).pipe(
      tap(response => {
    
          this.latestAnalysisSubject.next(response);
        
      })
    );
  }

  // uploadAndAnalyze(file: File, jobDescription: string): Observable<AnalysisResponse> {
  //   const formData = new FormData();
  //   formData.append('resume', file);
  //   if (jobDescription) {
  //     formData.append('jobDescription', jobDescription);
  //   }
  //   return this.http.post<AnalysisResponse>(`${this.apiUrl}/upload`, formData).pipe(
  //     tap(response => {
  //         this.latestAnalysisSubject.next(response.data);
        
  //     })
  //   );
  // }

//   uploadAndAnalyze(
//   file: File,
//   jobDescription: string
// ): Observable<AnalysisResponse> {

//   const formData = new FormData();

//   formData.append('resume', file);

//   if (jobDescription) {
//     formData.append('jobDescription', jobDescription);
//   }

//   return this.http
//     .post<AnalysisResponse>(
//       `${this.apiUrl}/upload`,
//       formData
//     )
//     .pipe(
//       tap(response => {
//         this.latestAnalysisSubject.next(
//           response.data
//         );
//       })
//     );
// }

uploadAndAnalyze(
  file: File,
  jobDescription: string
): Observable<ResumeAnalysis> {

  const formData = new FormData();

  formData.append('resume', file);

  if (jobDescription) {
    formData.append('jobDescription', jobDescription);
  }

  return this.http
    .post<ResumeAnalysis>(
      `${this.apiUrl}/upload`,
      formData
    )
    .pipe(
      tap(response => {
        console.log('API RESPONSE', response);

        this.latestAnalysisSubject.next(response);
      })
    );
}


  improveSection(section: string, resumeText: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/improve`, {
      resumeText,
      section
    });
  }
}
