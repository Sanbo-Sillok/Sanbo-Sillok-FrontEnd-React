export interface WikiPostBody {
  title: string;
  content: string;
}

export interface WikiPatchBody {
  content: string;
}

export interface ImageUploadResponse {
  imagePath: string;
}
