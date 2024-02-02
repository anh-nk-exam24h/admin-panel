import { memo } from 'react';
import { AnswerType } from 'enum';
import { alphabet } from 'utils/utils';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';

interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}
const PreviewMultiChoice = ({ data, isReadingQuestion, index }: Props) => {
  const alphabe = alphabet();
  const checkOptionTrue = data?.listSelectOptions?.filter((item: any) => item.is_true === true);

  return (
    <>
      {isReadingQuestion ? (
        <>
          {/* <MathJaxRender
            math={`<div class='flex font-bold'><p class='pr-1'>Câu ${Number(index) + 1}. </p> ${
              data?.text || 'Chưa cập nhật'
            }</div>`} */}
          <MathJaxRender math={`${Number(index) + 1}. ${data?.text || 'Chưa cập nhật'}`} />
          {/* /> */}
          {data?.image ? (
            <img className='h-[200px] my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <p className='font-bold'>Chi tiết câu hỏi</p>
          <MathJaxRender math={`${data?.text || 'Chưa cập nhật'}`} />
          {data?.image ? (
            <ZoomIn className='h-[200px] p-2 my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
          {data.audio ? <audio src={data?.audio} controls></audio> : ''}
          {data.video ? <video src={data?.video} controls></video> : ''}
        </>
      )}
      {checkOptionTrue.length == 0 ? (
        <span className='text-[red] font-bold'>Thiếu đáp án đúng</span>
      ) : (
        ''
      )}
      <div className='flex flex-wrap'>
        {data?.listSelectOptions?.map((item: any, index: number) => {
          if (data.answer_type == AnswerType.TEXT) {
            return (
              <div
                key={index}
                className={`flex overflow-x-auto ${
                  item.is_true ? 'bg-ct-secondary text-white ' : 'border '
                }p-4 w-[calc(50%-32px)] m-4 odd:ml-0 even:mr-0 rounded-lg`}
              >
                <div className='flex'>
                  <div className='mr-2 flex font-bold'>
                    {alphabe[index]} <div>.</div> &ensp;
                  </div>
                  <div>
                    <MathJaxRender math={`${item.answer_content}`} />
                  </div>
                </div>
              </div>
            );
          } else if (data.answer_type == AnswerType.IMAGE) {
            return (
              <div className={`w-[220px] h-[220px] p-4`}>
                <div
                  className={`w-full h-full flex justify-center rounded-lg  ${
                    item.is_true ? 'border-cyan-600 border-2' : 'border '
                  } `}
                >
                  <img
                    key={index}
                    className={`
                  w-[calc(1)] max-h-[280px] object-contain m-2 rounded-lg`}
                    src={item.answer_url_image}
                    alt=''
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
      <p className='font-bold mt-4'>Giải thích</p>
      <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} />
      {data.solution_image ? (
        <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.solution_image} alt='' />
      ) : (
        ''
      )}
      {data.solution_audio ? <audio src={data?.solution_audio} controls></audio> : ''}
      {data.solution_video ? <video src={data?.solution_video} controls></video> : ''}
      {isReadingQuestion ? (
        <></>
      ) : (
        <>
          {/* <p className='font-bold mt-4'>Giải thích</p>
          <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} />
          {data.solution_image ? (
            <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.solution_image} alt='' />
          ) : (
            ''
          )}
          {data.solution_audio ? <audio src={data?.solution_audio} controls></audio> : ''}
          {data.solution_video ? <video src={data?.solution_video} controls></video> : ''} */}
        </>
      )}
    </>
  );
};

export default memo(PreviewMultiChoice);
