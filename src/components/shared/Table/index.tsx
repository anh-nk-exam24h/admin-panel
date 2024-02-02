import { memo } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { LoadingOverlay, Popover, Table as TableMantine } from '@mantine/core';
import { ArrowDown2, ArrowUp2 } from 'iconsax-react';

import './style.css';

type columns = {
  title: string | JSX.Element | any;
  centered?: boolean;
  size?: number;
  hidden?: boolean;
  sort?: boolean;
  showItem?: boolean;
  // eslint-disable-next-line no-unused-vars
  setShowItem?: () => void | any;
  optionSort?: any[];
};
type data = {
  [key: string]: any;
};
interface TableProps {
  dataSource: { columns: columns[]; data: data[any] };
  // className?: string;
  // style?: CSSProperties;
  loading?: boolean;
  isDragable?: boolean;
  handleResultDrag?: any;
}

const Table = (props: TableProps) => {
  const { dataSource, loading, isDragable, handleResultDrag } = props;
  const centerColumn: number[] = [];
  const hiddenColumnIndex: number[] = [];

  if (!dataSource.data || dataSource.data.length === 0) {
    return <p className='p-10 w-fit mx-auto'>Không có dữ liệu</p>;
  }

  return (
    <>
      <div className='w-full relative'>
        {loading ? <LoadingOverlay visible={true} /> : ''}
        {!isDragable ? (
          <TableMantine
            verticalSpacing='md'
            highlightOnHover
            className='w-full border overflow-x-scroll'
          >
            <thead className='p-2 w-full'>
              <tr>
                {dataSource.columns.map((column: any, index: number) => {
                  if (column.centered) {
                    centerColumn.push(index);
                  }
                  if (column.hidden) {
                    hiddenColumnIndex.push(index);
                  }

                  return (
                    <th
                      className={`p-0 border-b-0 ${index !== 0 ? 'thead' : ''}`}
                      key={index}
                      style={{
                        display: column.hidden ? 'none' : '',
                        width: `${column.size}` ? `${column.size}px` : '',
                      }}
                    >
                      <div
                        className={`whitespace-nowrap flex justify-between items-center`}
                        style={{
                          width: `${column.size}` ? `${column.size}px` : '',
                          display: column.hidden ? 'none' : '',
                        }}
                      >
                        <div className={`px-4 ${column.centered ? 'mx-auto' : ''}`}>
                          {column.title}
                        </div>
                      </div>
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody className='w-full'>
              {dataSource.data.map((item: any, index: number) => (
                <tr key={index}>
                  {Object.keys(item).map((key: string, index2) => {
                    const isCenter = centerColumn.includes(index2);
                    const isHidden = hiddenColumnIndex.includes(index2);
                    if (key !== 'centered' && !isHidden) {
                      return (
                        <td
                          className={`pr-2 border-b-0 ${index2 !== 0 ? 'thead' : ''}`}
                          key={index2}
                        >
                          <div className={`whitespace-nowrap`}>
                            <div className={`px-4 w-fit ${isCenter ? 'mx-auto' : ''}`}>
                              {item[key] || <>&nbsp;</>}
                            </div>
                          </div>
                        </td>
                      );
                    }
                  })}
                </tr>
              ))}
            </tbody>
          </TableMantine>
        ) : (
          <>
            <DragDropContext onDragEnd={handleResultDrag}>
              <Droppable droppableId='listQuestionSelected'>
                {(provided) => (
                  <TableMantine
                    verticalSpacing='md'
                    highlightOnHover
                    className='w-full border overflow-x-scroll listQuestionSelected'
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    <thead className='p-2 w-full'>
                      <tr>
                        {dataSource.columns.map((column: any, index: number) => {
                          if (column.centered) {
                            centerColumn.push(index);
                          }
                          if (column.hidden) {
                            hiddenColumnIndex.push(index);
                          }

                          return (
                            <th
                              className={`p-0 border-b-0 ${index !== 0 ? 'thead' : ''}`}
                              key={index}
                              style={{
                                display: column.hidden ? 'none' : '',
                              }}
                            >
                              <div
                                className={`whitespace-nowrap flex justify-between items-center`}
                                style={{
                                  width: `${column.size}` ? `${column.size}px` : '',
                                  display: column.hidden ? 'none' : '',
                                }}
                              >
                                <div
                                  className={`px-4 flex items-center ${
                                    column.centered ? 'mx-auto' : ''
                                  }`}
                                >
                                  <span>{column.title}</span>{' '}
                                  {column.sort ? (
                                    <>
                                      <Popover
                                        opened={column.showItem}
                                        // opened={opened}
                                        onClose={column.setShowItem}
                                        target={
                                          <div className='ml-2' onClick={column.setShowItem}>
                                            <ArrowUp2
                                              size='15'
                                              variant='Bold'
                                              color={column.showItem ? '#017EFA' : '#000'}
                                            />
                                            <ArrowDown2
                                              size='15'
                                              color={column.showItem ? '#017EFA' : '#000'}
                                              variant='Bold'
                                              className='mt-[-5px]'
                                            />
                                          </div>
                                        }
                                        width={220}
                                        position='bottom'
                                        withArrow
                                      >
                                        <div>
                                          {column.optionSort.map((key: any, index: number) => (
                                            <div>
                                              <p
                                                className={`hover:bg-ct-secondary hover:text-white p-1 cursor-pointer  ${
                                                  index + 1 == key.active
                                                    ? ` bg-ct-secondary text-white`
                                                    : ``
                                                } `}
                                                onClick={() => key.func(index + 1)}
                                              >
                                                {key.title}
                                              </p>
                                            </div>
                                          ))}
                                        </div>
                                      </Popover>
                                    </>
                                  ) : (
                                    ''
                                  )}
                                </div>
                              </div>
                            </th>
                          );
                        })}
                      </tr>
                    </thead>
                    <tbody className='w-full'>
                      {dataSource.data.map((item: any, index: number) => (
                        <Draggable
                          key={item.idQuestion}
                          draggableId={item.idQuestion.toString()}
                          index={index}
                        >
                          {(provided) => (
                            <tr
                              key={index}
                              ref={provided.innerRef}
                              {...provided.dragHandleProps}
                              {...provided.draggableProps}
                              className='active:bg-blue-400 hover:bg-blue-400'
                            >
                              {Object.keys(item).map((key: string, index2) => {
                                const isCenter = centerColumn.includes(index2);
                                const isHidden = hiddenColumnIndex.includes(index2);
                                if (key !== 'centered' && !isHidden) {
                                  return (
                                    <td
                                      className={`pr-2 border-b-0 ${index2 !== 0 ? 'thead' : ''}`}
                                      key={index2}
                                    >
                                      <div className={`whitespace-nowrap`}>
                                        <div className={`px-4 w-fit ${isCenter ? 'mx-auto' : ''}`}>
                                          {item[key] || <>&nbsp;</>}
                                        </div>
                                      </div>
                                    </td>
                                  );
                                }
                              })}
                            </tr>
                          )}
                        </Draggable>
                      ))}
                    </tbody>
                  </TableMantine>
                )}
              </Droppable>
            </DragDropContext>
          </>
        )}
      </div>
    </>
  );
};

export default memo(Table);
