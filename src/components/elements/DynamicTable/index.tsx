import { memo, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Edit2, Eye, Trash } from 'iconsax-react';
import { ConfigForm, Constant } from 'store/selector';

import MathJaxRender from 'components/shared/MathJax';
import Table from 'components/shared/Table';

const DynamicTable = (props: any) => {
  const constantFormRedux = useSelector(Constant);
  const configFormRedux = useSelector(ConfigForm);
  const constantForm = JSON.parse(JSON.stringify(constantFormRedux));
  const configFormData = JSON.parse(JSON.stringify(configFormRedux)) || {};
  const [propertieTable, setPropertieTable] = useState<any>([]);

  const textTable = 'table';

  useEffect(() => {
    const propertieTableRedux = configFormData.properties.filter(
      (item: any) => item.scope === 'question'
    );
    setPropertieTable(propertieTableRedux);
  }, []);

  return (
    <div>
      <Table
        dataSource={{
          columns: [
            {
              title: 'Hành Động',
              size: 100,
            },
            {
              title: 'ID câu hỏi',
              size: 100,
            },
            {
              title: 'Nội dung câu hỏi',
              size: 250,
            },
            {
              title: 'Độ khó',
            },
            {
              title: 'Kiểu câu hỏi',
            },
            {
              title: 'Người tạo',
            },
            ...propertieTable.map((propertie: any) => {
              return {
                title: propertie.name,
              };
            }),
          ],
          data: props.listQuestion.map((key: any) => {
            const rowData = {
              action: (
                <div className='flex'>
                  <Trash
                    size='20'
                    className='mr-2 text-ct-red-300'
                    color='currentColor'
                    variant='Bold'
                    onClick={() => {
                      props.setIdDeleteQuestion(key.idQuestion);
                      props.setDeleted(true);
                    }}
                  />
                  <Edit2
                    size='20'
                    color='currentColor'
                    variant='Bold'
                    className='mx-2 text-ct-secondary'
                    onClick={() => {
                      props.handleEditQuestion(key.idQuestion);
                    }}
                  />
                  <Eye
                    size='20'
                    color='currentColor'
                    className='ml-2 text-ct-green-300'
                    onClick={() => props.handlePreviewQuestion(key.idQuestion)}
                  />
                </div>
              ),
              id: key.idQuestion,
              grade:
                key.text.search(textTable) >= 2 ? (
                  ''
                ) : (
                  <MathJaxRender
                    className='whitespace-pre-wrap line-clamp-3'
                    math={`${key.text}`}
                  />
                ),
              level:
                constantForm?.question.level.filter(
                  (key1: any) => parseInt(key1.value) == key.level
                )[0]?.title || '',
              choice: constantForm?.question.quiz_type.filter(
                (key1: any) => parseInt(key1.value) == key.quiz_type
              )[0]?.title,
              createdBy: key.createdBy,
            };

            propertieTable.forEach((property: any) => {
              if (key.properties) {
                const typeName = property.type;
                // sẽ có lúc property là string có lúc là object
                // nếu là object thì lấy trường name, nếu là string thì giữ nguyên
                if (typeof key.properties[typeName] === 'object') {
                  Object.assign(rowData, {
                    [typeName]: key.properties[typeName].name || '',
                  });
                } else {
                  Object.assign(rowData, {
                    [typeName]: key.properties[typeName] || '',
                  });
                }
              }
            });
            return rowData;
          }),
        }}
        loading={props.loading}
      />
    </div>
  );
};

export default memo(DynamicTable);
