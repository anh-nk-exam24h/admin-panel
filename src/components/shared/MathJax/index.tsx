import { memo, useEffect, useRef } from 'react';

import './style.css';

type MathJaxRender = {
  math?: string | any;
  styletext?: string;
  className?: string;
};

const MathJaxRender = ({ math, styletext, className }: MathJaxRender) => {
  const idDom = useRef(null);
  useEffect(() => {
    if (window.MathJax) {
      window.MathJax.typesetPromise([idDom.current]).then(() => {});
    }
  }, [math]);

  return (
    <div ref={idDom} className={className}>
      <div
        dangerouslySetInnerHTML={{ __html: math.replaceAll('<mfenced>', '<mfenced separators>') }}
        className={`${styletext}`}
      ></div>
    </div>
  );
};

export default memo(MathJaxRender);
// import { MathJax, MathJaxContext } from 'better-react-mathjax';

// export default function App({ math, styletext, className }: any) {
//   return (
//     <MathJaxContext>
//       <MathJax>
//         <div className={className}>
//           <span
//             className={`${styletext}`}
//             dangerouslySetInnerHTML={{
//               __html: math,
//             }}
//           ></span>
//         </div>
//       </MathJax>
//     </MathJaxContext>
//   );
// }
