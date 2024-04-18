import { Subject, SubjectType } from './subject.interface';

export interface Assignment {
  _id: string;
  studentId: string;
  score: number;
  comment?: string;
  isDone: boolean;
  file: string;
  subject: string | Subject;
}
