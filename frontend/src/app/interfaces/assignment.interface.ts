import { Subject, SubjectType } from './subject.interface';
import { User } from './user.interface';

export interface Assignment {
  _id: string;
  title: string;
  student: string | User;
  score: number;
  comment?: string;
  isDone: boolean;
  file: string;
  subject: string | Subject;
  teacher?: string | User;
  creationDate?: Date;
  validationDate?: Date;
}
