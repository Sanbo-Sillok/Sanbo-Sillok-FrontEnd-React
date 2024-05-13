export interface WikiData {
  id: number | null;
  title: string | null;
  contents: string | null;
  lastModifier: string | null;
  status: 'ACTIVE' | 'PROTECTED' | 'REPORTED' | null;
  updatedAt: Date | null;
  isExist: boolean;
}

export interface ExistWikiData extends WikiData {
  id: number;
  title: string;
  contents: string;
  lastModifier: string;
  status: 'ACTIVE' | 'PROTECTED' | 'REPORTED';
  updatedAt: Date;
  isExist: true;
}

export interface NotExistWikiData extends WikiData {
  id: null;
  title: null;
  contents: null;
  lastModifier: null;
  status: null;
  updatedAt: null;
  isExist: false;
}
