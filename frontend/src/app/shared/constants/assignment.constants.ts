import { Assignment } from '../../interfaces/assignment.interface';
import { Subject, SubjectType } from '../../interfaces/subject.interface';

export const EMTPY_ASSIGNMENT: Assignment = {
  _id: '',
  title: '',
  student: '',
  score: 0,
  isDone: false,
  file: '',
  subject: '',
};

export const SUBJECT_COLORS: Record<SubjectType, string> = {
  [SubjectType.ANGULAR]: '#5299D3',
  [SubjectType.JEE]: '#0B5563',
  [SubjectType.HADOOP]: '#C08497',
  [SubjectType.BIG_DATA]: '#7E6C6C',
  [SubjectType.SQL]: '#C7D59F',
  [SubjectType.DEVOPS]: '#3F3047',
  [SubjectType.DOTNET]: '#EEF36A',
  [SubjectType.GRAILS]: '#F0A202',
};
