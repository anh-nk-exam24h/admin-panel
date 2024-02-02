import { memo } from 'react';
import { questionEnumType } from 'enum';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';

import PreviewDragDrop from './PreviewDragDrop';
import PreviewFillblank from './PreviewFillblank';
import PreviewMultiChoice from './PreviewMultiChoice';
import PreviewMultiYesNo from './PreviewMultiYesNo';
import PreviewPair from './PreviewPair';
import PreviewShort from './PreviewShort';
import PreviewYesNo from './PreviewYesNo';

const PreviewReading = ({ data }: any) => {
  return (
    <div>
      <p className='font-bold'>Chi tiết câu hỏi</p>
      <MathJaxRender math={`${data?.text || 'Chưa cập nhật'}`} />
      {data?.image ? (
        <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.image} alt='' />
      ) : (
        ''
      )}
      {data.audio ? <audio src={data?.audio} controls></audio> : ''}
      {data.video ? (
        <video src={data?.video} controls className='w-[331px] h-[186px] rounded-xl'></video>
      ) : (
        ''
      )}
      {/* <p className='font-bold mt-4'>Giải thích</p>
      <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} /> */}
      {data?.listQuestionChildren?.map((item: any, index: number) => {
        switch (Number(item.quiz_type)) {
          case questionEnumType.ONE_RIGHT:
            return <PreviewMultiChoice key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.MULTIPLE_RIGHT:
            return <PreviewMultiChoice key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.YES_NO:
            return <PreviewYesNo key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.SHORT:
            return <PreviewShort key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.PAIR:
            return <PreviewPair key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.DRAG_DROP:
            return <PreviewDragDrop key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.FILL_BLANK:
            return <PreviewFillblank key={index} data={item} isReadingQuestion index={index} />;
          case questionEnumType.MULTIPLE_YES_NO_ONE_RIGHT:
          case questionEnumType.MULTIPLE_YES_NO_MULTIPLE_RIGHT:
            return <PreviewMultiYesNo key={index} data={item} isReadingQuestion index={index} />;
          default:
            break;
        }
      })}

      {data.solution_image ? (
        <ZoomIn className='h-[200px] my-4 rounded-2xl' src={data?.solution_image} alt='' />
      ) : (
        ''
      )}
      {data.solution_audio ? <audio src={data?.solution_audio} controls></audio> : ''}
      {data.solution_video ? (
        <video
          src={data?.solution_video}
          controls
          className='w-[331px] h-[186px] rounded-xl'
        ></video>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(PreviewReading);
