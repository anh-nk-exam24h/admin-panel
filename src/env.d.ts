// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_URL_ADMIN: string;
  readonly VITE_API_KEY: string;
  readonly NODE_ENV: string;
  readonly VITE_EXAM_DOMAIN: string;
  readonly VITE_TSA_DOMAIN: string;
  readonly VITE_SPEAKING_LCAT: string;
  readonly VITE_HOCMAI: string;
  readonly VITE_ICT: string;
  readonly VITE_FLT: string;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
