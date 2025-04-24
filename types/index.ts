export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type Mode = 'gp' | 'cgpa';

export interface Course {
  grade: Grade;
  units: number;
}