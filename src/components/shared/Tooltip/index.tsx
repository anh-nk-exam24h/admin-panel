import { ReactNode } from 'react';

import './style.css';

type ToolTipProp = {
  label?: ReactNode;
  color?: string;
  width?: number;
  height?: string;
  children: ReactNode;
  icon?: ReactNode;
  style?: string;
};
const ToolTip = ({
  style,
  label,
  icon,
  color,
  width,
  // height,
  children,
}: ToolTipProp) => {
  return (
    <div>
      <div className='relative children z-1'>
        {children}
        <div className={`label hidden absolute mt-2 ${style ? style : ''} z-10 right-0`}>
          <div
            className={`flex w-${width} justify-center items-center ${
              color ? `bg-${color}` : 'bg-ct-secondary'
            }  p-4 rounded-lg shadow`}
          >
            <div className='mr-2'>{icon}</div>
            <div>{label}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ToolTip;
