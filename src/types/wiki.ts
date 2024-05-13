export interface WikiData {
  id: number | null;
  title: string | null;
  content: string | null;
  lastModifier: string | null;
  status: 'ACTIVE' | 'PROTECTED' | 'REPORTED' | null;
  updatedAt: Date | null;
  isExist: boolean;
}

export interface ExistWikiData extends WikiData {
  id: number;
  title: string;
  content: string;
  lastModifier: string;
  status: 'ACTIVE' | 'PROTECTED' | 'REPORTED';
  updatedAt: Date;
  isExist: true;
}

export interface NotExistWikiData extends WikiData {
  id: null;
  title: null;
  content: null;
  lastModifier: null;
  status: null;
  updatedAt: null;
  isExist: false;
}
