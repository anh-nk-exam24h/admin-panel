import { useEffect, useState } from 'react';
import { Pagination as Paginate } from '@mantine/core';

type PaginationProps = {
  // eslint-disable-next-line no-unused-vars
  handlePaging: (page: number) => void;
  total: number;
  border?: boolean;
  sibling?: number;
  reload?: boolean;
  active?: number;
};

const Pagination = ({
  handlePaging,
  total,
  border,
  sibling,
  reload = true,
  active,
}: PaginationProps) => {
  const [activePage, setActivePage] = useState(1);

  useEffect(() => {
    if (!reload) {
      setActivePage(1);
    }
  }, [reload]);

  useEffect(() => {
    if (active) {
      setActivePage(active);
    } else {
      setActivePage(1);
    }
  }, [active]);

  return (
    <>
      <Paginate
        total={total}
        spacing={-5}
        radius={100}
        siblings={sibling}
        classNames={{
          item: `rounded-full text-ct-secondary hover:bg-gray-300 px-3 py-1 m-1 ${
            border ? 'border' : 'border-none'
          }`,
          active: 'bg-ct-secondary text-white',
        }}
        page={activePage}
        onChange={(page) => {
          setActivePage(() => page);
          handlePaging(page);
        }}
      />
    </>
  );
};

export default Pagination;
