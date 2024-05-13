export interface WikiPostBody {
  title: string;
  content: string;
}

export interface WikiPatchBody {
  content: string;
}

export interface ImageUploadResponse {
  status: number;
  message: string;
  result: {
    id: number;
    image: string;
  };
}
