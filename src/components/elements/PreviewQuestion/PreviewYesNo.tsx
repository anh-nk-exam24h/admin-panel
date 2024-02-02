import { memo } from 'react';
import { Checkbox } from '@mantine/core';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';
interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}
const PreviewYesNo = ({ data, isReadingQuestion, index }: Props) => {
  return (
    <>
      {isReadingQuestion ? (
        <>
          <MathJaxRender math={`${Number(index) + 1}. ${data?.text || 'Chưa cập nhật'}`} />
        </>
      ) : (
        <>
          <p className='font-bold'>Chi tiết câu hỏi</p>
          <MathJaxRender math={`${data?.text}`} />
          {data?.image ? (
            <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
          {data.audio ? <audio src={data?.audio} controls></audio> : ''}
          {data.video ? <video src={data?.video} controls></video> : ''}
        </>
      )}
      <div className='flex'>
        {data?.listSelectOptions.map((item: any) => {
          return (
            <div className='p-10'>
              <Checkbox
                radius={100}
                classNames={{
                  root: `w-fit p-[2px] h-fit border-2 rounded-full 
                  ${item.is_true ? 'border-[#017EFA]' : ' border-transparent'}
                  `,
                }}
                size='xs'
                icon={() => {
                  return <></>;
                }}
                checked={item.is_true}
              />
              <MathJaxRender math={`${item.answer_content}`} />
            </div>
          );
        })}
      </div>
      {isReadingQuestion ? (
        <></>
      ) : (
        <>
          <p className='font-bold mt-4'>Giải thích</p>
          <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} />
          {data.solution_image ? (
            <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.solution_image} alt='' />
          ) : (
            ''
          )}
          {data.solution_audio ? <audio src={data?.solution_audio} controls></audio> : ''}
          {data.solution_video ? <video src={data?.solution_video} controls></video> : ''}
        </>
      )}
    </>
  );
};

export default memo(PreviewYesNo);
