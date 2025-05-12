
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'doctor' | 'admin' | 'assistant';
  specialty?: 'gastro' | 'obesity' | 'both';
  clinic?: string;
  preferences?: UserPreferences;
  createdAt: Date;
}

export interface UserPreferences {
  language: 'english' | 'hindi' | 'kannada';
  noteTemplate: 'SOAP' | 'freeform' | 'problem-oriented';
  darkMode?: boolean;
}

export interface Patient {
  id: string;
  name: string;
  age: number;
  gender: 'male' | 'female' | 'other';
  contactNumber?: string;
  email?: string;
  medicalHistory?: string;
  allergies?: string[];
  medications?: Medication[];
  bmi?: number;
  weight?: number;
  height?: number;
  createdAt: Date;
  lastVisit?: Date;
}

export interface Medication {
  name: string;
  dosage: string;
  frequency: string;
  startDate?: Date;
  endDate?: Date;
}

export interface Appointment {
  id: string;
  patientId: string;
  patientName: string;
  date: Date;
  status: 'scheduled' | 'completed' | 'cancelled' | 'no-show';
  reason?: string;
  notes?: string;
  followUp?: Date;
}

export interface ConsultationNote {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  content: NoteContent;
  tags?: string[];
  status: 'draft' | 'completed' | 'signed';
}

export interface NoteContent {
  chiefComplaint?: string;
  history?: string;
  examination?: string;
  diagnosis?: string[];
  plan?: string;
  medications?: Medication[];
  followUp?: string;
}

export interface Template {
  id: string;
  name: string;
  category: 'GI' | 'obesity' | 'procedure';
  content: NoteContent;
  createdBy: string;
  isFavorite: boolean;
}

export interface Recording {
  id: string;
  patientId: string;
  doctorId: string;
  date: Date;
  duration: number; // in seconds
  status: 'processing' | 'completed' | 'error';
  audioUrl?: string;
  transcriptionText?: string;
  noteId?: string;
}
