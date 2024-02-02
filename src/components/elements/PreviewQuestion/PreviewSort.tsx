import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';
interface Props {
  data: any;
}
const PreviewSort = ({ data }: Props) => {
  const noiseList: any[] = [];
  // eslint-disable-next-line no-unsafe-optional-chaining
  const array = [...data?.listSortOptions?.options, ...data?.listSortOptions?.solution];
  for (let i = 0; i < array.length; i++) {
    if (array.lastIndexOf(array[i]) === array.indexOf(array[i])) {
      noiseList.push(array[i]);
    }
  }

  return (
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
      <div className='flex flex-wrap'>
        {data?.listSortOptions?.options?.map((item: any, index: number) => {
          return (
            <div key={index} className={`border p-2 rounded-lg w-fit mr-4 my-2`}>
              {item}
            </div>
          );
        })}
      </div>
      <p className='mt-4 font-bold'>Trả lời</p>
      <div className='flex flex-wrap'>
        {data?.listSortOptions?.solution?.map((item: any, index: number) => {
          return (
            <div key={index} className={`border p-2 rounded-lg w-fit mr-4 my-2`}>
              {item}
            </div>
          );
        })}
      </div>
      <p className='mt-4 font-bold'>Từ gây nhiễu</p>
      <div className='flex flex-wrap'>
        {noiseList?.map((item: any, index: number) => {
          return (
            <div key={index} className={`border p-2 rounded-lg w-fit mr-4 my-2`}>
              {item}
            </div>
          );
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
    </>
  );
};

export default PreviewSort;
