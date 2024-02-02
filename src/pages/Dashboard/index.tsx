import { FC } from 'react';
import { RingProgress, Text } from '@mantine/core';

import CardLineChart from 'components/elements/Chart/CardLineChart';

const DashboardContainer: FC = () => {
  return (
    <>
      <div className='flex flex-wrap w-full'>
        <div>
          <CardLineChart />
          <CardLineChart />
        </div>
        <div>
          <RingProgress
            label={
              <Text size='xs' align='center'>
                Application data usage
              </Text>
            }
            sections={[
              { value: 40, color: 'cyan' },
              { value: 15, color: 'orange' },
              { value: 15, color: 'grape' },
            ]}
          />
        </div>
        <div className='w-full xl:w-4/12 px-4'></div>
      </div>
    </>
  );
};

export default DashboardContainer;
