import MathJaxRender from 'components/shared/MathJax';

interface Props {
  data: any;
  isQuestionElsaSpeaking: boolean;
}
const PreviewElsaSpeaking = ({ data, isQuestionElsaSpeaking }: Props) => {
  return (
    <>
      {!!isQuestionElsaSpeaking && <></>}
      <p className='font-bold w-full my-4'>Tiêu đề câu hỏi</p>
      <MathJaxRender math={`${data?.speakElsa?.sentence || 'Chưa cập nhật'}`} />
      <p className='font-bold w-full my-4'>Nội dung câu hỏi</p>
      <MathJaxRender math={`${data?.text || 'Chưa cập nhật'}`} />
      <p className='font-bold w-full my-4'>Giải thích:</p>
      <MathJaxRender math={`${data?.solution || 'Chưa cập nhật'}`} />
    </>
  );
};

export default PreviewElsaSpeaking;
