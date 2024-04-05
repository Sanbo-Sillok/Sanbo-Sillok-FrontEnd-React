export interface WikiData {
  status: number;
  message: string;
  result: {
    id: number;
    contents: string;
    title: string;
    status: 'ACTIVE' | 'PROTECTED' | 'REPORTED';
    created_at: Date;
    updated_at: Date;
    last_modified_by: number;
  };
  writer: string;
}
