import { SubjectType } from './subject.interface';

export enum Role {
  STUDENT = 'STUDENT',
  TEACHER = 'TEACHER',
}

export interface User {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  photo?: string;
  subject?: SubjectType;
  role: Role;
}
