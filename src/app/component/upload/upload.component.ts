import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup } from "@angular/forms";
import { Router } from "@angular/router";
import { ResumeService } from "../../service/resume.service";

@Component({
  selector: 'app-upload',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss'
})
export class UploadComponent {

  uploadForm: FormGroup;
  selectedFile: File | null = null;
  isLoading = false;
  error = '';

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService,
    private router: Router
  ) {
    this.uploadForm = this.fb.group({
      jobDescription: [''],
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      this.selectedFile = file;
    }
  }

  onSubmit(): void {
    if (!this.selectedFile) {
      this.error = 'Please select a resume file';
      return;
    }

    this.isLoading = true;
    this.error = '';

    const jobDescription = this.uploadForm.get('jobDescription')?.value;

    this.resumeService.uploadAndAnalyze(this.selectedFile, jobDescription).subscribe({
      next: (response) => {
        this.isLoading = false;
        this.router.navigate(['/results']);
      },
      error: (err) => {
        this.error = err.error?.error || 'Failed to analyze resume';
        this.isLoading = false;
      },
    });
  }

}

