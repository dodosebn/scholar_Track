export type Grade = 'A' | 'B' | 'C' | 'D' | 'E' | 'F';
export type Mode = 'gp' | 'cgpa';
export interface ResultProps {
  result: number | null;
  mode: 'Gp' | 'cgpa';
}
export interface Course {
  grade: Grade;
  units: number;
}
export interface ProperIntroProps {
  title: string;
  note: string;
}
export interface ImageStore {
  image: string;
  setImage: (url: string) => void;
  uploadImage: (file: File, userId: string) => Promise<string | null>;
}

export interface AuthState {
    email: string;
    password: string;
    handleEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handlePasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  }
  export interface setAuthProps {
    email: '',
    name: '',
    bio: ''
  }
  export interface CalcMainProps {
    Grade: Record<Grade, number>;
    courses: Course[];
    handleGradeChange: (index: number, value: Grade) => void;
    handleUnitsChange: (index: number, value: number) => void;
    removeCourse: (index?: number) => void;
    addCourse: () => void;
    calculate: () => void;
  }
  export type ProfileDataProps = {
    id: string;
    name: string;
    email: string;
    bio: string;
    avatar_url: string | null;
    public_email: boolean;
    pronouns: string;
    website_url: string;
    social_links: {
      twitter?: string;
      github?: string;
      linkedin?: string;
      portfolio?: string;
    };
  };