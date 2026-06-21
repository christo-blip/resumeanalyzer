import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { Subscription } from "rxjs";
import { ResumeAnalysis } from "../../models/resume/resume.module";
import { ResumeService } from "../../service/resume.service";

@Component({
  selector: 'app-analysis-results',
  imports: [CommonModule, RouterModule],
  templateUrl: './analysis-results.component.html',
  styleUrl: './analysis-results.component.scss'
})
export class AnalysisResultsComponent implements OnInit, OnDestroy {
  @Input() analysis: ResumeAnalysis | null = null;
  private sub: Subscription | null = null;

  constructor(private resumeService: ResumeService) {}

  ngOnInit(): void {
    // Only subscribe to shared state if input was not provided directly
    if (!this.analysis) {
      this.sub = this.resumeService.latestAnalysis$.subscribe(data => {
        this.analysis = data;
      });
    }
  }

  ngOnDestroy(): void {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

