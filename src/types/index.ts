import { FunctionComponent } from 'react';

export type RequestAPIParams = {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  payload?: any;
  params?: any;
  pagination?: Pagination;
  file?: File;
  notify?: Notify;
  hiddenMessage?: boolean;
};

export type Notify = {
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  autoClose?: boolean;
};

export type Pagination = {
  pageSize: number;
  pageIndex: number;
};

export type EditorProps = {
  // eslint-disable-next-line no-unused-vars
  handleContent: (content: string) => void;
  placeholder: string;
  label?: string;
  contentQuestion?: any;
  error?: boolean;
  required?: boolean;
  showOnly?: boolean;
  className?: string;
  disableItem?: string[];
  tooltip?: string;
};

export type BreadcumItem = {
  title: string;
  href: string;
};

export type RouteType = {
  path: string;
  element: FunctionComponent;
  layout?: FunctionComponent;
};
declare global {
  interface Window {
    MathJax: any;
  }
}
