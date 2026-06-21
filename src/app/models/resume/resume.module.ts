// export interface ResumeAnalysis {
//   atsScore: number;
//   keywords: string[];
//   improvements: string[];
//   strengths: string[];
//   summary: string;
//   jobMatchScore: number;
//   missingKeywords: string[];
//   fileName?: string;
// }

// export interface AnalysisResponse {
//   success: boolean;
//   data: ResumeAnalysis;
// }

export interface ResumeAnalysis {
  atsScore: number;
  jobMatchScore: number;
  summary: string;
  strengths: string[];
  improvements: string[];
  keywords: string[];
  missingKeywords: string[];
}

// export interface AnalysisResponse {
//   success: boolean;
//   data: ResumeAnalysis;
// }