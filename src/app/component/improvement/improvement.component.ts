import { Component } from '@angular/core';
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ResumeService } from "../../service/resume.service";

@Component({
  selector: 'app-improvement',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './improvement.component.html',
  styleUrl: './improvement.component.scss'
})
export class ImprovementComponent {
  improveForm: FormGroup;
  isLoading = false;
  error = '';
  improvedContent: string | null = null;
  tips: string[] = [];
  copySuccess = false;

  sections = [
    { value: 'Summary', label: 'Professional Summary' },
    { value: 'Experience', label: 'Work Experience' },
    { value: 'Projects', label: 'Projects & Portfolio' },
    { value: 'Skills', label: 'Technical Skills' },
    { value: 'Education', label: 'Education' }
  ];

  constructor(
    private fb: FormBuilder,
    private resumeService: ResumeService
  ) {
    this.improveForm = this.fb.group({
      resumeText: ['', [Validators.required, Validators.minLength(20)]],
      section: ['Summary', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.improveForm.invalid) {
      this.error = 'Please enter valid resume text (at least 20 characters).';
      return;
    }

    this.isLoading = true;
    this.error = '';
    this.improvedContent = null;
    this.tips = [];
    this.copySuccess = false;

    const { resumeText, section } = this.improveForm.value;

    this.resumeService.improveSection(section, resumeText).subscribe({
      next: (response) => {
        this.isLoading = false;
        if (response && response.success && response.data) {
          this.improvedContent = response.data.improved;
          this.tips = response.data.tips || [];
        } else {
          this.error = 'Failed to retrieve improvement recommendations.';
        }
      },
      error: (err) => {
        this.isLoading = false;
        this.error = err.error?.error || 'Failed to improve section. Please try again.';
      }
    });
  }

  copyToClipboard(): void {
    if (!this.improvedContent) return;
    
    navigator.clipboard.writeText(this.improvedContent).then(() => {
      this.copySuccess = true;
      setTimeout(() => this.copySuccess = false, 2500);
    });
  }
}

