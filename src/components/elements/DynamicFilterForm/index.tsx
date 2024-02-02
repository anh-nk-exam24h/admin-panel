/* eslint-disable camelcase */
import { memo, useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Select, TextInput } from '@mantine/core';
import { RequestAPI } from 'api/requestAPI';
import { PathAPI } from 'api/route';
import { TypeInput } from 'enum';
import { ArrowDown2 } from 'iconsax-react';
import { ConfigForm, Constant } from 'store/selector';

import { defaultForm } from './data';

const DynamicFilter = (props: any) => {
  const configFormRedux = useSelector(ConfigForm);
  const constantFormRedux = useSelector(Constant);
  const configFormData = JSON.parse(JSON.stringify(configFormRedux)) || {};
  const constantFormData = JSON.parse(JSON.stringify(constantFormRedux)) || [];
  const dataFilter = [...defaultForm.properties, ...configFormData.properties];
  const [filterQuestion, setFilterQuestion] = useState<any>([]);
  const [dataForRoleConfig, setDataForRoleConfig] = useState<any>({});
  const [fromFilter, setFromFilter] = useState<any>({
    quiz_type: '',
    level: '',
    subjectLevel: '',
    KnowledgeLevel: '',
    lesson: '',
    customSubject: '',
    lo: '',
  });

  const [fromFilterDynamic, setFromFilterDynamic] = useState<any>({
    subjectLevel: '',
    KnowledgeLevel: '',
    lesson: '',
    customSubject: '',
  });

  const handleChangeForm = (value: any) => {
    setFromFilter((pre: any) => {
      const dataForm = {
        ...pre,
        ...value,
      };
      props.filter(dataForm);
      return dataForm;
    });
    setFromFilterDynamic((pre: any) => {
      return {
        ...pre,
        ...value,
      };
    });
  };

  useLayoutEffect(() => {
    if (configFormData.properties.length > 0) {
      Promise.all(
        configFormData.properties.map((property: any) => {
          return RequestAPI({
            url: `${PathAPI.config}/${property.type}`,
            method: 'GET',
          });
        })
      ).then((resData) => {
        const tranformData: any = {};
        resData.map((field, index) => {
          const data = field.data;
          const reformat = data.map((i: any) => {
            return {
              label: i.name,
              value: '' + i.idProperty,
            };
          });
          tranformData[`${configFormData.properties[index].type}`] = reformat;
          return {
            [configFormData.properties[index].type]: reformat,
          };
        });
        setDataForRoleConfig(tranformData);
      });
    }
  }, [configFormData.properties.length]);

  useEffect(() => {
    setFromFilterDynamic((pre: any) => {
      return {
        ...pre,
        ...props.keepDataFilter,
      };
    });
    setFromFilter((pre: any) => {
      return {
        ...pre,
        ...props.keepDataFilter,
      };
    });
  }, []);

  useEffect(() => {
    const filterQuestion = dataFilter.filter((item) => {
      return item.scope === 'question';
    });

    setFilterQuestion(filterQuestion);
  }, [props.show]);

  return (
    <div className='w-full flex flex-wrap 2xl:flex-nowrap py-3'>
      {props.show ? (
        <>
          {Object.keys(dataForRoleConfig).length > 0 &&
            filterQuestion.map((property: any) => {
              const key = property.type;
              switch (property.inputType) {
                case TypeInput.STATIC: {
                  const dataSelectStatic = constantFormData?.question[key]?.map((item: any) => {
                    item['label'] = item.title;
                    item['value'] = '' + item.value;
                    item['key'] = item.value;
                    return item;
                  });
                  return (
                    <Select
                      className={`w-1/8 pr-2`}
                      classNames={{
                        label: 'text-base font-semibold text-black',
                      }}
                      rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                      label={property.name}
                      placeholder={`Nhập ${property.name}`}
                      data={dataSelectStatic || []}
                      onChange={(e: any) => {
                        const value = e;
                        handleChangeForm({ [key]: value });
                      }}
                      value={fromFilter[key]}
                    />
                  );
                }
                case TypeInput.NUMBER: {
                  return (
                    <Select
                      className={`w-1/8 pr-2`}
                      classNames={{
                        label: 'text-base font-semibold text-black',
                      }}
                      rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
                      styles={{ rightSection: { pointerEvents: 'none' } }}
                      label={property.name}
                      placeholder={`Nhập ${property.name}`}
                      data={dataForRoleConfig[key] || []}
                      onChange={(e: any) => {
                        const value = e;
                        handleChangeForm({ ['properties.' + key]: value });
                        handleChangeForm({ [key]: value });
                      }}
                      value={fromFilterDynamic[key]}
                    />
                  );
                }
                case TypeInput.STRING: {
                  return (
                    <TextInput
                      className={`w-1/8 pr-2`}
                      classNames={{
                        label: 'text-base font-semibold text-black',
                      }}
                      label={property.name}
                      placeholder={`Nhập ${property.name}`}
                      onChange={(e: any) => {
                        const value = e.target.value;
                        handleChangeForm({ ['properties.' + key]: value });
                        handleChangeForm({ [key]: value });
                      }}
                    />
                  );
                }
                default:
                  break;
              }
            })}
        </>
      ) : (
        ''
      )}
    </div>
  );
};

export default memo(DynamicFilter);
