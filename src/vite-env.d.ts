/// <reference types="vite/client" />

interface ImportMetaEnv {
  // 환경 변수들에 대한 타입 정의...
  readonly VITE_API_DOMAIN: string;
  readonly VITE_PUBLIC_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
