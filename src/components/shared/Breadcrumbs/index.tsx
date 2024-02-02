import { useEffect, useState } from 'react';
import { Link, useLocation, useParams } from 'react-router-dom';
import { Breadcrumbs } from '@mantine/core';
import { Graph } from 'iconsax-react';
import { BreadcumItem } from 'types';

import { breadcumbRoute } from './route';

const Breadcrumb = () => {
  const location = useLocation();
  const params = useParams();
  const [breadcrumb, setBreadcrumb] = useState<BreadcumItem[]>([]);

  useEffect(() => {
    for (const key in params) {
      if (key == 'idCourse') {
        const obj = {
          title: params[key],
          href: `/report-test/${params.idCourse}`,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'id') {
        const obj = {
          title: params[key],
          href: `/report-test/${params.idCourse}/${params.id}`,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idBaikiemtra') {
        const obj = {
          title: `Danh sách đề bài / Chỉnh sửa đề thi/ ${params.idBaikiemtra}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idQuestion') {
        const obj = {
          title: `Danh sách câu hỏi / Chỉnh sửa câu hỏi/ ${params.idQuestion}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idTSA') {
        const obj = {
          title: `Cấu hình đợt thi ${
            location.pathname.includes('tsa-test') ? 'thử' : ''
          }/Cuộc thi TSA số ${params.idTSA}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idIELTS') {
        const obj = {
          title: `Cấu hình đợt thi/Cuộc thi IELTS số ${params.idIELTS}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idHSA') {
        const obj = {
          title: `Cấu hình đợt thi/Cuộc thi HSA số ${params.idHSA}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idPractice') {
        const obj = {
          title: `Cấu hình đợt thi/Đề luyện tập số ${params.idPractice}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idTopClass') {
        const obj = {
          title: `Cấu hình đợt thi/Đề luyện tập số ${params.idTopClass}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idHSAHCM') {
        const obj = {
          title: `Cấu hình đợt thi/Đề luyện tập số ${params.idHSAHCM}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      } else if (key == 'idTestsite') {
        const obj = {
          title: `Cấu hình đợt thi/Đề luyện tập số ${params.idTestsite}`,
          href: ``,
        };
        setBreadcrumb((pre: any) => [...pre, obj]);
      }
    }

    breadcumbRoute.map((item: BreadcumItem) => {
      if (item.href === location.pathname) {
        setBreadcrumb([item]);
      }
    });
  }, [location.pathname]);

  const items = breadcrumb.map((item: BreadcumItem, index: number) => (
    <Link to={item.href} key={index}>
      <p className='text-blueGray-700 text-xl font-semibold'>{item.title}</p>
    </Link>
  ));

  return (
    <div className='relative w-full max-w-full flex flex-grow items-center flex-1'>
      <h6 className='uppercase bg-ct-secondary w-min rounded-full p-2 mb-1 text-xs font-semibold'>
        <Graph size={20} color='white' />
      </h6>{' '}
      <Breadcrumbs separator='/' className='pl-5'>
        {items}
      </Breadcrumbs>
    </div>
  );
};

export default Breadcrumb;
