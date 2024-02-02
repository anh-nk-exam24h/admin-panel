import { memo } from 'react';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';
interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}
const PreviewFillblank = ({ data, isReadingQuestion, index }: Props) => {
  let indexFill = 1;
  let contentQuestion = data?.text;
  const regex = /___/gi;
  let result;
  const indices = [];
  while ((result = regex.exec(contentQuestion))) {
    indices.push(result.index);
  }
  indices.map(() => {
    contentQuestion = contentQuestion.replace(
      '___',
      `(${indexFill++})
            ` +
        `<span draggable="true" class="border rounded-[8px] border-[#8E8E8E] min-w-[132px] inline-block relative top-[10px] h-9 px-3 py-1" id="indexInputFill${index}">
      
            </span>`
    );
  });
  return (
    <>
      {isReadingQuestion ? (
        <>
          {Number(index) + 1}.
          <MathJaxRender math={`${contentQuestion || 'Chưa cập nhật'}`} />
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
          <p className='font-bold mt-4'>Từ khóa</p>
          {data?.listQuestionChildren?.map((item: any) => {
            return (
              <MathJaxRender
                math={`${item?.listShortAnswer?.listKeyword?.join(', ') || 'Chưa cập nhật'}`}
              />
            );
          })}
        </>
      )}

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
  );
};

export default memo(PreviewFillblank);
