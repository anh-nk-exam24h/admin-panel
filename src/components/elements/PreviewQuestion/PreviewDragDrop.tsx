import { memo, useEffect, useState } from 'react';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';
interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}
const PreviewDragDrop = ({ data, isReadingQuestion, index }: Props) => {
  const [content, setContent] = useState<any>('');
  const [hiddenBlock, setHiddenBlock] = useState(false);

  useEffect(() => {
    const RenderQuestion = () => {
      // eslint-disable-next-line no-unused-vars
      let indexInputFill = 0;
      let index = 1;
      let contentQuestion = data.text;
      const regex = /___/gi;
      let result;
      const indices = [];
      while ((result = regex.exec(contentQuestion))) {
        indices.push(result.index);
      }
      indices.map(() => {
        contentQuestion = contentQuestion.replace(
          '___',
          `(${index++})
                ` +
            `<span draggable="true" class="border rounded-[8px] border-dashed border-[#8E8E8E] min-w-[132px] inline-block relative top-[10px] h-9 px-3 py-1" id="indexInputFill${index}">
      
                </span>`
        );
        // eslint-disable-next-line @typescript-eslint/no-explicit-any

        indexInputFill++;
      });
      //
      if (contentQuestion.includes('$$$')) {
        const blockDrag = document.getElementById('block-drag') as HTMLElement;

        contentQuestion = contentQuestion.replace('$$$', `${blockDrag.innerHTML}`);
        setHiddenBlock(true);
      }

      setContent(contentQuestion);
      //
    };
    RenderQuestion();
  }, []);

  // const listAnswerDrag =
  //   data?.listQuestionChildren?.map((item: any) => item.listShortAnswer.listKeyword[0]) ||
  //   data.optionDrag;
  // const listAnswerDecoy = data.listAnswerDecoy || data.answerDecoy;
  const listAnswerDrag = data.listAnswerDrag || data.data.listAnswerDrag;
  return (
    <>
      {isReadingQuestion ? (
        <>
          {Number(index) + 1}.
          <MathJaxRender math={`${content || 'Chưa cập nhật'}`} />
          {data?.image ? (
            <img className='h-[200px] my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
        </>
      ) : (
        <>
          <p className='font-bold'>Chi tiết câu hỏi</p>
          <MathJaxRender math={`${content || 'Chưa cập nhật'}`} />
          {data?.image ? (
            <ZoomIn className='h-[200px] p-2 my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
          {data.audio ? <audio src={data?.audio} controls></audio> : ''}
          {data.video ? <video src={data?.video} controls></video> : ''}
        </>
      )}
      <div id='block-drag' className={hiddenBlock ? 'hidden' : ''}>
        <div className='flex flex-wrap mt-3'>
          {listAnswerDrag?.map((item: any, index: number) => {
            return (
              <div
                key={index}
                className={`border-2 p-2 rounded-lg w-fit mr-4 my-2`}
                dangerouslySetInnerHTML={{ __html: item }}
              ></div>
            );
          })}
        </div>
      </div>

      {/* <p className='mt-4 font-bold'>Câu trả lời</p>
      <div className=''>
        {listAnswerDrag.map((item: any, index: number) => {
          return (
            <div className='flex font-medium items-center'>
              <div className='text-[16px] mr-4'>Vị trí thả {index + 1}</div>
              <div key={index} className={`border p-2 rounded-lg w-fit mr-4 my-2`}>
                {item}
              </div>
            </div>
          );
        })}
      </div>
      <p className='mt-4 font-bold'>Câu trả lời gây nhiễu</p>
      <div className='flex flex-wrap'>
        {listAnswerDecoy.map((item: any, index: number) => {
          return (
            <div key={index} className={`border p-2 rounded-lg w-fit mr-4 my-2`}>
              {item}
            </div>
          );
        })}
      </div> */}
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

export default memo(PreviewDragDrop);
