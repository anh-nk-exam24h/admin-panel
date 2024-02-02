import { memo } from 'react';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';

interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}
const PreviewShort = ({ data, isReadingQuestion, index }: Props) => {
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
      <p className='font-bold mt-4'>Từ khóa</p>
      <div className='flex'>
        {data?.listShortAnswer?.listKeyword.length > 0 ? (
          data?.listShortAnswer?.listKeyword.map((key: any) => (
            <MathJaxRender
              math={`${key.length > 50 ? key.substring(0, 50) + '...' : key}`}
              className='border p-2 rounded-lg w-fit mr-4 my-2'
            />
          ))
        ) : (
          <span className='text-[red]'>Thiếu từ khóa đúng</span>
        )}
      </div>
      {isReadingQuestion ? (
        <></>
      ) : (
        <>
          <p className='font-bold mt-4'>Giải thích</p>
          <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} />
          {data?.solution_image ? (
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

export default memo(PreviewShort);
