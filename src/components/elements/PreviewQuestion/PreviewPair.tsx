import { memo } from 'react';

import MathJaxRender from 'components/shared/MathJax';
interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}

import ZoomIn from 'components/elements/ZoomIn';

const PreviewPair = ({ data, isReadingQuestion, index }: Props) => {
  return (
    <>
      {' '}
      {isReadingQuestion ? (
        <>
          <MathJaxRender math={`${Number(index) + 1}. ${data?.text}`} />
        </>
      ) : (
        <>
          <p className='font-bold'>Chi tiết câu hỏi</p>
          <MathJaxRender math={`${data?.text || 'Chưa cập nhật'}`} />
          {data?.image ? (
            <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
          {data.audio ? <audio src={data?.audio} controls></audio> : ''}
          {data.video ? <video src={data?.video} controls></video> : ''}
        </>
      )}
      <p className='font-bold mt-4'>Trả lời</p>
      {Array.from({ length: data?.listPairOptions?.keys.length }, (_, index) => {
        return (
          <div className='flex items-center'>
            <div className='w-1/8'>
              <p className='font-bold'>{index + 1}.</p>
            </div>
            {data.listPairOptions.keys[index].text ? (
              <div className='w-1/3'>
                <div className='border rounded-lg p-4 m-4' key={index}>
                  <p>{data?.listPairOptions?.keys[index].text}</p>
                </div>
              </div>
            ) : (
              <div className='w-1/3'>
                <div className='border rounded-lg p-4 m-4' key={index}>
                  <img src={data?.listPairOptions?.keys[index].image} alt='' />
                </div>
              </div>
            )}{' '}
            -
            {data.listPairOptions.values[index].text ? (
              <div className='w-1/3'>
                <div className='border rounded-lg p-4 m-4' key={index}>
                  <p>{data?.listPairOptions?.values[index].text}</p>
                </div>
              </div>
            ) : (
              <div className='w-1/3'>
                <div className='border rounded-lg p-4 m-4' key={index}>
                  <img src={data?.listPairOptions?.values[index].image} alt='' />
                </div>
              </div>
            )}
          </div>
        );
      })}
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

export default memo(PreviewPair);
