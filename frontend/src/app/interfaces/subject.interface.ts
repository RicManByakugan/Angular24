import { User } from './user.interface';

export enum SubjectType {
  ANGULAR = 'Angular',
  JEE = 'Jakarta EE',
  HADOOP = 'Hadoop',
  BIG_DATA = 'Big data',
  SQL = 'Sql',
  DEVOPS = 'DevOps',
  DOTNET = 'Dotnet',
  GRAILS = 'Grails',
}

export interface Subject {
  _id?: string;
  teacherId: string | User;
  type: SubjectType;
}
