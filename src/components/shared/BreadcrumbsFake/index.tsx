import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Graph } from 'iconsax-react';

import { breadcumbRoute } from './route';

const BreadCrumpFake = () => {
  const params = useParams();
  const [title, setTitle] = useState<string>();

  useEffect(() => {
    const routing = breadcumbRoute.find((item: any) => item.href == params.type);
    setTitle(routing?.title);
  }, [params]);

  return (
    <div className='relative w-full max-w-full flex flex-grow items-center flex-1'>
      <h6 className='uppercase bg-ct-secondary w-min rounded-full p-2 mb-1 text-xs font-semibold'>
        <Graph size={20} color='white' />
      </h6>{' '}
      <p className='text-blueGray-700 text-xl font-semibold ml-4'>{title}</p>
    </div>
  );
};

export default BreadCrumpFake;
