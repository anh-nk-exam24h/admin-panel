import { memo } from 'react';

import MathJaxRender from 'components/shared/MathJax';

import ZoomIn from '../ZoomIn';

interface Props {
  data: any;
  isQuestionSpeaking: boolean;
}

const PreviewSpeaking = ({ data, isQuestionSpeaking }: Props) => {
  return (
    <>
      {isQuestionSpeaking && <></>}
      <p className='font-bold w-full mt-4 mb-2'>Chi tiết câu hỏi:</p>
      <MathJaxRender math={`${data?.text || 'Chưa cập nhật'}`} />
      {data.image ? (
        <ZoomIn src={data?.image} className='h-[200px] my-3 rounded-2xl' alt='IMG' />
      ) : (
        ''
      )}
      {data.audio ? <audio className='my-3' src={data?.audio} controls></audio> : ''}
      {data.video ? (
        <video src={data?.video} controls className='my-3 w-[331px] h-[186px] rounded-xl'></video>
      ) : (
        ''
      )}
      <p className='font-bold w-full mt-4 mb-2'>Giải thích:</p>
      <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} />
    </>
  );
};

export default memo(PreviewSpeaking);
