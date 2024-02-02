declare module 'chart.js';
declare module 'react-input-autosize';
declare module 'xuanchiennx-customs-ck5-0.5';
declare module 'ckeditor5-mathtype-anhnk';
declare module 'anhnk3-ckeditor5';
declare module 'ckeditor5-anhnk';
declare module '@ckeditor/ckeditor5-basic-styles/src/underline';
declare module '@ckeditor/ckeditor5-react';
declare module 'recordrtc';
declare module 'react-audio-analyser';
declare module 'uuid';
declare module '*.jpg';
declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
declare module '*.png' {
  export const ReactComponent: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;

  const src: string;
  export default src;
}
