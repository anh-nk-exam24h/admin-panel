import { lazy, Suspense } from 'react';
import { withErrorBoundary } from 'react-error-boundary';
import { questionEnumType } from 'enum';

import Loading from 'components/elements/Loading';
import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';

import ErrorFallback from '../ErrorFallback';

import PreviewMultiChoice from './PreviewMultiChoice';
import PreviewMultiYesNo from './PreviewMultiYesNo';

const PreviewShort = lazy(() => import('./PreviewShort'));
const PreviewYesNo = lazy(() => import('./PreviewYesNo'));
const PreviewPair = lazy(() => import('./PreviewPair'));
const PreviewReading = lazy(() => import('./PreviewReading'));
const PreviewFillblank = lazy(() => import('./PreviewFillblank'));
const PreviewSort = lazy(() => import('./PreviewSort'));
const PreviewElsaSpeaking = lazy(() => import('./PreviewElsaSpeaking'));
const PreviewDragDrop = lazy(() => import('./PreviewDragDrop'));
const PreviewSpeaking = lazy(() => import('./PreviewSpeaking'));
const PreviewDropdown = lazy(() => import('./PreviewDropdown'));

interface Props {
  quizType: questionEnumType;
  data: any;
  isQuestionElsaSpeaking?: boolean;
  isQuestionSpeaking?: boolean;
  isQuestionDropdown?: boolean;
}

const PreviewQuestion = ({
  quizType,
  data,
  isQuestionElsaSpeaking = false,
  isQuestionSpeaking = false,
}: Props) => {
  const switchQuestionType = (quizType: questionEnumType) => {
    const textTable = 'table';
    switch (Number(quizType)) {
      case questionEnumType.ESSAY: {
        return (
          <>
            <p className='font-bold'>Chi tiết câu hỏi</p>
            {data.text.search(textTable) >= 2 ? (
              <div className='w-full'>
                <MathJaxRender math={data.text || 'Chưa cập nhật'} styletext={'customtable'} />
              </div>
            ) : (
              <div>
                <MathJaxRender math={data.text || 'Chưa cập nhật'} />
              </div>
            )}
            {data.image ? (
              <ZoomIn src={data?.image} className='h-[200px] my-4 rounded-2xl' alt='IMG' />
            ) : (
              ''
            )}
            {data.audio ? <audio src={data?.audio} controls></audio> : ''}
            {data.video ? (
              <video src={data?.video} controls className='w-[331px] h-[186px] rounded-xl'></video>
            ) : (
              ''
            )}
            <p className='font-bold mt-4'>Giải thích</p>
            <MathJaxRender
              math={`${data?.solution || 'Chưa cập nhật'}`}
              styletext={'customtable'}
            />
            {data.solution_image ? (
              <ZoomIn src={data?.solution_image} className='h-[200px] my-4 rounded-2xl' alt='IMG' />
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
          </>
        );
      }
      case questionEnumType.ONE_RIGHT: {
        return <PreviewMultiChoice data={data} />;
      }
      case questionEnumType.MULTIPLE_RIGHT: {
        return <PreviewMultiChoice data={data} />;
      }
      case questionEnumType.YES_NO: {
        return <PreviewYesNo data={data} />;
      }
      case questionEnumType.SHORT: {
        return <PreviewShort data={data} />;
      }
      case questionEnumType.PAIR: {
        return <PreviewPair data={data} />;
      }
      case questionEnumType.READING: {
        return <PreviewReading data={data} />;
      }
      case questionEnumType.FILL_BLANK: {
        return <PreviewFillblank data={data} />;
      }
      case questionEnumType.SORT: {
        return <PreviewSort data={data} />;
      }
      case questionEnumType.ELSASPEAKING: {
        return <PreviewElsaSpeaking data={data} isQuestionElsaSpeaking={isQuestionElsaSpeaking} />;
      }
      case questionEnumType.DRAG_DROP: {
        return <PreviewDragDrop data={data} />;
      }
      case questionEnumType.MULTIPLE_YES_NO_ONE_RIGHT: {
        return <PreviewMultiYesNo data={data} />;
      }
      case questionEnumType.MULTIPLE_YES_NO_MULTIPLE_RIGHT: {
        return <PreviewMultiYesNo data={data} />;
      }
      case questionEnumType.SPEAKING: {
        return <PreviewSpeaking data={data} isQuestionSpeaking={isQuestionSpeaking} />;
      }
      case questionEnumType.DROPDOWN_ONE_RIGHT: {
        return <PreviewDropdown data={data} isQuestionDropdown={isQuestionSpeaking} />;
      }
      default:
        return <></>;
    }
  };
  return <Suspense fallback={<Loading />}>{switchQuestionType(quizType)}</Suspense>;
};

export default withErrorBoundary(PreviewQuestion, {
  FallbackComponent: ErrorFallback,
});
