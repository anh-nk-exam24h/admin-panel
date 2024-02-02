import { memo } from 'react';
import { Checkbox, Radio } from '@mantine/core';

import ZoomIn from 'components/elements/ZoomIn';
import MathJaxRender from 'components/shared/MathJax';

import './style.css';

interface Props {
  data: any;
  isReadingQuestion?: boolean;
  index?: number;
}

const PreviewMultiYesNo = ({ data, isReadingQuestion, index }: Props) => {
  const { listCheckOptions, listQuestionChildren } = data;

  return (
    <>
      {isReadingQuestion ? (
        <>
          {Number(index) + 1}.
          <MathJaxRender math={`${data?.text || 'Chưa cập nhật'}`} />
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
      <div className='mt-2'>
        <div className='overflow-x-auto w-full'>
          <table className='w-full'>
            <thead className='w-full'>
              <tr>
                <th className='border text-center pr-1' style={{ minWidth: '400px' }}>
                  <p style={{ minWidth: '400px' }}>{listCheckOptions.title_question}</p>
                </th>
                {listCheckOptions.title_answer.map((item: any) => {
                  return (
                    <th
                      className='border text-center py-2'
                      key={item.idCheck}
                      style={{ minWidth: '100px' }}
                    >
                      <p style={{ minWidth: '100px' }}>{item.text}</p>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody>
              {listQuestionChildren.map((item: any, index: any) => (
                <tr key={index}>
                  <td className='border py-2 pl-2'>
                    <MathJaxRender math={item.text} styletext={'customtable'} />
                  </td>
                  {item.listSelectOptions.map((i: any) => (
                    <td key={i.idCheck} className='border py-2'>
                      {data.quiz_type === 10 && (
                        <Radio
                          className='ml-[47%] custom-radio'
                          checked={i.is_true}
                          value={''}
                          onChange={() => {}}
                        />
                      )}
                      {data.quiz_type === 11 && (
                        <Checkbox className='ml-[47%]' checked={i.is_true} onChange={() => {}} />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default memo(PreviewMultiYesNo);
