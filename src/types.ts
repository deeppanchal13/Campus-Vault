export type ResourceType = 'all' | 'notes' | 'pyq' | 'cheatsheet' | 'lab';

export interface AcademicResource {
  id: string;
  title: string;
  subject: string;
  subjectCode: string;
  semester: number;
  type: 'notes' | 'pyq' | 'cheatsheet' | 'lab';
  isVerified: boolean;
  verifierName: string;
  facultyDept: string;
  dateUploaded: string;
  fileSize: string;
  pages: number;
  year?: number;
  examType?: 'End-Semester' | 'Mid-Semester' | 'Supplementary';
  hasSolutions?: boolean;
  downloadsCount: number;
  description: string;
  keyTopics: string[];
  sampleContentSnippet?: string;
  contributorName?: string;
}

export interface SubjectModule {
  id: string;
  name: string;
  code: string;
  semester: number;
  description: string;
  iconName: string;
  notesCount: number;
  pyqsCount: number;
  pyqYears: string;
  topics: string[];
  syllabusUnits: {
    unit: number;
    title: string;
    topics: string[];
  }[];
}

export interface DeptRep {
  name: string;
  role: string;
  department: string;
  email: string;
  room: string;
  officeHours: string;
}
