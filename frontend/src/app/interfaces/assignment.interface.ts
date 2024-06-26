import { Subject } from './subject.interface';
import { User } from './user.interface';

export interface Assignment {
  _id: string;
  title: string;
  student: string | User;
  score: number;
  comment?: string;
  isDone: boolean;
  file: string;
  subject?: any;
  teacher?: string | User;
  creationDate?: Date;
  validationDate?: Date;
}
