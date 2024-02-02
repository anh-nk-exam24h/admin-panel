import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { QuestionPreview } from 'store/selector';
import { formatTimeString } from 'utils/utils';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';

import './style.css';
interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
  isQuestionDropdown?: boolean;
}
const PreviewDropdown = ({ data, isReadingQuestion, isQuestionDropdown, index }: Props) => {
  const questionPreviewRedux = useSelector(QuestionPreview);

  const [content, setContent] = useState<any>('');

  const formatTime = (time: string) => {
    return `${formatTimeString(time).hoursConvert}:${formatTimeString(time).minutes}:${
      formatTimeString(time).seconds
    }, ${formatTimeString(time).date}/${formatTimeString(time).month}/${
      formatTimeString(time).year
    }`;
  };
  useEffect(() => {
    const RenderQuestion = () => {
      let contentQuestion = data.text;
      const regex = /___/gi;
      let result;
      const indices = [];
      while ((result = regex.exec(contentQuestion))) {
        indices.push(result.index);
      }
      indices.map((k, i) => {
        const childQuestion = data.listQuestionChildren[i];
        const arr: any = [];
        arr.push(`<option></option>`);
        childQuestion.listSelectOptions.map((key: any) =>
          arr.push(`<option value=${key.answer_id}>${key.answer_content}</option>`)
        );
        contentQuestion = contentQuestion.replace(
          '___',
          `<select class="tikc-select" value='' id='select${i}'>
          ${arr}
        </select>`
        );
      });

      setContent(contentQuestion);
      //
    };
    RenderQuestion();
  }, []);
  const activeChange = document.getElementById('select' + 0) as HTMLElement;
  activeChange?.addEventListener('change', function () {
    console.log('changed');
  });
  return (
    <>
      {isReadingQuestion ? (
        <>
          {Number(index) + 1}.{/* <MathJaxRender math={`${content || 'Chưa cập nhật'}`} /> */}
        </>
      ) : (
        <>
          {!!isQuestionDropdown && <></>}
          <p className='font-bold'>Chi tiết câu hỏi</p>
          <MathJaxRender math={`${content}`} />
          {data?.image ? (
            <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.image} alt='' />
          ) : (
            ''
          )}
          {data.audio ? <audio src={data?.audio} controls></audio> : ''}
          {data.video ? <video src={data?.video} controls></video> : ''}
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

export default memo(PreviewDropdown);
