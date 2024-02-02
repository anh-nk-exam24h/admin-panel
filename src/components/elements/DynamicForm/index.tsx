/* eslint-disable prefer-const */
/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Input, Modal, MultiSelect, Select, TextInput } from '@mantine/core';
import { RequestAPI } from 'api';
import { PathAPI } from 'api/route';
import { questionEnumType, TagType, TypeInput } from 'enum';
import { Add, ArrowDown2, SearchNormal1 } from 'iconsax-react';
import { ConfigForm, Constant, QuestionPreviewAdd } from 'store/selector';
import { updateQuestionPreviewAdd } from 'store/slice/question';
import { convertObjToArrCustomKey } from 'utils/utils';

import {
  classAndSubjectType,
  classList,
} from 'components/template/ManageQuestion/Question/CreateQuestion/type';
import { subjectType } from 'components/template/ManageQuestion/Question/type';

import { defaultForm } from './data';

import './style.css';

interface DynamicFormType {
  data?: any;
  // eslint-disable-next-line no-unused-vars
  handleDataForm: (data: any) => void;
  // getDataDynamicFormToPreview: (data: any) => void;
  // eslint-disable-next-line no-unused-vars
  handleGetDataToPreview: (data: any) => void;
  listThematic: any;
}
const DynamicForm = ({
  data = {},
  handleDataForm,
  handleGetDataToPreview,
  listThematic,
}: DynamicFormType) => {
  const dispatch = useDispatch();
  const constantFormRedux = useSelector(Constant);
  const questionFormRedux = useSelector(QuestionPreviewAdd);
  const configFormRedux = useSelector(ConfigForm);
  const constantFormData = JSON.parse(JSON.stringify(constantFormRedux)) || [];
  const configFormData = JSON.parse(JSON.stringify(configFormRedux)) || {};

  const [config, setConfig] = useState<any>();
  const [disableField, setDisableField] = useState<Record<string, string>>(
    convertObjToArrCustomKey(defaultForm.propertyConfig.disable)
  );
  const [propertyField, setPropertyField] = useState(defaultForm.properties);
  const [formData, setFormData] = useState<any>(data);
  // eslint-disable-next-line no-unused-vars
  const [formDataToPreview, setFormDataToPreview] = useState<any>();
  const [classAndSubjectForm, setClassAndSubjectForm] = useState<classAndSubjectType[]>([]);
  const [subjectListForm, setSubjectListForm] = useState<subjectType[]>([]);
  const [classListForm, setClassListForm] = useState<classList[]>([]);
  const [knowLedgeListForm, setKnowledgeListForm] = useState<any[]>([]);
  const [knowLedge, setKnowledge] = useState<any[]>([]);
  const [knowLedgeTemp, setKnowledgeTemp] = useState<any[]>([]);
  const [idThematic, setIDThematic] = useState('');
  const [dataForRoleConfig, setDataForRoleConfig] = useState<any>({});
  const [opened, setOpened] = useState(false);

  const [ListNameThematic, setListNameThematic] = useState<any>([]);
  const [ListThematic, setListThematic] = useState<any>([]);
  const [listTopic, setListTopic] = useState<any>([]);
  const [listTopicSelected, setListTopicSelected] = useState<any>([]);
  const handleChangeForm = (value: any) => {
    setFormData((prev: any) => {
      const dataForm = {
        ...prev,
        ...value,
      };
      handleDataForm(dataForm);
      return dataForm;
    });
  };

  // eslint-disable-next-line no-unused-vars
  const handleChangeFormToPreview = (value: any) => {
    setFormDataToPreview((prev: any) => {
      const dataForm = {
        ...prev,
        ...value,
      };
      handleGetDataToPreview(dataForm);
      return dataForm;
    });
  };

  const searchByName = (value: string) => {
    if (idThematic != '') {
      const data = knowLedgeTemp.filter((item: any) =>
        item.name.toLowerCase().includes(value.toLowerCase())
      );
      setKnowledge(data);
      return;
    }
    RequestAPI({
      url: PathAPI.knowledgeUnit,
      method: 'GET',
      params: {
        name: value,
        limit: 100000,
      },
    }).then((res) => {
      if (res.status) {
        setKnowledge(res.data);
      }
    });
  };
  const addKnowledgeUnit = () => {
    setListTopic(listTopicSelected);
    setOpened(false);
  };
  useEffect(() => {
    if (configFormData.properties.length > 0) {
      setDisableField((prev: any) => {
        return {
          ...prev,
          ...convertObjToArrCustomKey(configFormData.propertyConfig.disable),
        };
      });
      setConfig(configFormData);

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
    RequestAPI({
      url: PathAPI.class,
      method: 'GET',
    }).then((res: any) => {
      if (res.status) {
        setClassAndSubjectForm(res.data);
        const listClass = res.data.map((item: any) => {
          const classTemp = {
            value: '',
            label: '',
          };
          classTemp.value = `${item.idClass}`;
          classTemp.label = item.name;
          return classTemp;
        });
        // dispatch(updateQuestionPreviewAdd({ ...questionFormRedux, listClass: res.data }));
        setClassListForm(listClass);
      }
    });
    RequestAPI({
      url: PathAPI.knowledgeUnit,
      method: 'GET',
      params: {
        type: TagType.QUESTION,
        limit: 100000,
      },
    }).then((res: any) => {
      if (res.status) {
        setKnowledge(res.data);
        setKnowledgeListForm(res.data);
      }
    });
  }, []);
  useEffect(() => {
    dispatch(updateQuestionPreviewAdd({ ...questionFormRedux, listClass: classListForm }));
  }, [classListForm]);
  useEffect(() => {
    let arrKnowledge: any[] = [];
    data.knowledgeUnit.map((item: any) => {
      const itemKnowled = knowLedgeListForm.filter(
        (knowled: any) => knowled.idKnowledgeUnit == item
      )[0];

      arrKnowledge = [...arrKnowledge, itemKnowled];
    });
    setListTopic(arrKnowledge);
  }, [knowLedgeListForm]);

  const searchByThematic = (value: string) => {
    if (value !== '') {
      const arr: any[] = [];

      const thematicItem = listThematic.filter((item: any) => item.idThematic == value)[0];
      thematicItem?.listKnowledUnit?.map((key: any) => {
        arr.push(key);
        return key;
      });
      setKnowledge(arr);
      setKnowledgeTemp(arr);
    }
    if (value == null) {
      const listFilter: any = [];
      knowLedgeListForm.map((topic: any) => {
        const checkIndex = listTopicSelected.findIndex(
          (select: any) => select.idKnowledgeUnit === topic.idKnowledgeUnit
        );
        if (checkIndex == -1) {
          listFilter.push(topic);
        }
      });
      setKnowledge(listFilter);
    }
  };
  const handleDelteTopic = (key: any) => {
    RequestAPI({
      url: PathAPI.knowledgeUnit,
      params: {
        limit: 100000,
      },
      method: 'GET',
    }).then((res) => {
      if (res.status) {
        setKnowledge(res.data);
        setListTopicSelected(
          listTopicSelected.filter((item: any) => item.idKnowledgeUnit !== key.idKnowledgeUnit)
        );
      }
    });
  };
  const filterKnowledge = () => {
    const listFilter: any = [];
    knowLedge.map((topic: any) => {
      const checkIndex = listTopicSelected.findIndex(
        (select: any) => select.idKnowledgeUnit === topic.idKnowledgeUnit
      );
      if (checkIndex == -1) {
        listFilter.push(topic);
      }
    });
    return listFilter;
  };

  useEffect(() => {
    const dataFilter = filterKnowledge();
    setKnowledge(dataFilter);
  }, [listTopicSelected]);
  useEffect(() => {
    if (opened) {
      // setListTopicSelected(listTopic);
    }
  }, [opened]);
  useEffect(() => {
    function removeDuplicates(array: any) {
      const result: any = [];
      const ids: any = [];

      for (let i = 0; i < array.length; i++) {
        const currentObj = array[i];
        const currentId = JSON.stringify(currentObj);

        if (!ids.includes(currentId)) {
          result.push(currentObj);
          ids.push(currentId);
        }
      }

      return result;
    }
    let arrThematic: any[] = [];
    if (listTopic.length > 0) {
      listTopic.map((item: any) => {
        item?.thematics?.map((thematic: any) => {
          arrThematic = [...arrThematic, thematic];
          return item;
        });
      });
      // xóa bỏ tên chuyên đề trùng nhau
      // console.log(arrThematic);

      setListNameThematic(removeDuplicates(arrThematic));

      const getListIdKnowled = listTopic.map((item: any) => item.idKnowledgeUnit);
      handleChangeForm({ knowledgeUnit: getListIdKnowled });
    }
  }, [listTopic]);
  useEffect(() => {
    // handleChangeClass
    if (classAndSubjectForm.length > 0 && formData?.listClass?.length > 0) {
      const listSubject: any[] = [];

      formData.listClass.map((item: any) => {
        classAndSubjectForm[item]?.listSubject.map((subj: any) => {
          const subject = {
            value: '' + subj.idSubject,
            label: subj.name,
          };
          const index = listSubject.findIndex((item: any) => item.value == subject.value);
          if (index === -1) {
            listSubject.push(subject);
          }

          return subject;
        });
      });

      // xử lý chỉ lấy môn thỏa mãn tất cả cá lớp được chọn
      const arrListSubjectWithClass: any[][] = formData.listClass
        .map((idClass: any) => {
          return classAndSubjectForm.filter((obj) => obj.idClass === Number(idClass))[0]
            .listSubject;
        })
        .reduce((total: any, currentValue: any) => {
          return total.concat(currentValue);
        }, []);
      const uniqueArray: any[] = [];
      arrListSubjectWithClass.map((subj: any) => {
        const duplicate = arrListSubjectWithClass.filter(
          (i: any) => i.idSubject === subj.idSubject
        );
        const isHave = uniqueArray.findIndex((i) => i.value == subj.idSubject);
        if (formData.listClass.length === 1 && isHave === -1) {
          uniqueArray.push({
            value: subj.idSubject,
            label: subj.name,
          });
        } else if (duplicate.length > 1 && isHave === -1) {
          uniqueArray.push({
            value: subj.idSubject,
            label: subj.name,
          });
        }
      });
      dispatch(updateQuestionPreviewAdd({ ...questionFormRedux, listSubject: uniqueArray }));
      setSubjectListForm(uniqueArray);
    }
  }, [formData.listClass, classAndSubjectForm]);

  useEffect(() => {
    let propertyFieldAr: any[] = [...propertyField];
    let disableArr = [...configFormData.propertyConfig.disable];
    if (parseInt(formData.quiz_type) === questionEnumType.SPEAKING) {
      disableArr.push('knowledgeUnit');
      propertyFieldAr.push({
        name: 'Cấu hình giọng nói',
        type: 'accent',
        inputType: 'number',
        scope: 'question',
        isAutoComputed: false,
      });
      propertyFieldAr.push({
        name: 'Cấu hình phần thi Speaking',
        type: 'part',
        inputType: 'number',
        scope: 'question',
        isAutoComputed: false,
      });
    } else {
      disableArr = disableArr.filter((item: any) => item !== 'knowledgeUnit');
      propertyFieldAr = propertyFieldAr.filter((item: any) => item.type !== 'accent');
      propertyFieldAr = propertyFieldAr.filter((item: any) => item.type !== 'part');
    }
    setDisableField(() => {
      return {
        ...convertObjToArrCustomKey(disableArr),
      };
    });
    setPropertyField(propertyFieldAr);
  }, [formData.quiz_type]);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  useEffect(() => {
    const dataSearch: any = {
      idSubject: formData.listSubject.join(','),
      idClass: formData.listClass.join(','),
    };
    if (formData.listSubject.length == 0) {
      delete dataSearch.idSubject;
    }
    if (formData.listClass.length == 0) {
      delete dataSearch.idClass;
    }
    RequestAPI({
      url: PathAPI.thematic,
      params: dataSearch,
      method: 'GET',
    }).then((res) => {
      setListThematic(res.data);
    });
  }, [formData.listClass, formData.listSubject]);
  return (
    <div className='w-full flex flex-wrap'>
      {constantFormData.question &&
        propertyField.map((property) => {
          const key = property.type;
          switch (property.inputType) {
            case TypeInput.STRING:
              return (
                <TextInput
                  disabled={property.isAutoComputed === true}
                  className={`w-1/3 px-7 py-3 border_input ${
                    disableField[key] ? 'hidden' : 'block'
                  }`}
                  radius={15}
                  label={property.name}
                  placeholder={`Nhập ${property.name}`}
                  onChange={(e: any) => {
                    const value = e.target.value;
                    handleChangeForm({ [key]: value });
                  }}
                  value={formData[key]}
                />
              );
            case TypeInput.ARRAY: {
              let data: unknown[] = [];
              if (key === 'listClass') {
                data = classListForm;
              } else if (key === 'listSubject') {
                data = subjectListForm;
              } else if (key === 'knowledgeUnit') {
                data = knowLedgeListForm.map((key: any) => {
                  const item: subjectType = {
                    label: key.name,
                    value: key.idKnowledgeUnit,
                  };
                  return item;
                });
              } else if (key === 'thematic') {
                data = listThematic.map((key: any) => {
                  return {
                    label: key.name,
                    value: key.idThematic,
                  };
                });
              } else {
                data = constantFormData?.question[key]?.map((item: any) => {
                  item['label'] = item.title;
                  item['value'] = '' + item.value;
                  item['key'] = item.value;
                  return item;
                });
              }
              return (
                <MultiSelect
                  disabled={property.isAutoComputed === true}
                  className={`w-1/3 px-7 py-3 unborder_input 
                  ${
                    disableField[key] || key == 'knowledgeUnit' || key == 'thematic'
                      ? 'hidden'
                      : 'block'
                  }
                  `}
                  radius={15}
                  rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                  label={property.name}
                  placeholder={`Nhập ${property.name}`}
                  data={data as Array<any>}
                  onChange={(e: any) => {
                    const value = e;
                    const dataChoie = constantFormData?.question[key]?.find(
                      (item: any) => item.value == value
                    );

                    handleChangeForm({ [key]: value });
                    handleChangeFormToPreview({ [key]: dataChoie });
                  }}
                  searchable
                  value={formData[key]}
                />
              );
            }
            case TypeInput.NUMBER: {
              let data: unknown[] = [];
              if (key === 'part') {
                data = Array.from({ length: 3 }).map((i, index) => {
                  const item = {
                    label: 'Part ' + (index + 1),
                    value: (index + 1).toString(),
                  };
                  return item;
                });
              } else {
                data = constantFormData?.question[key]?.map((item: any) => {
                  item['label'] = item.title;
                  item['value'] = '' + item.value;
                  item['key'] = item.value;
                  return item;
                });
              }

              return (
                <Select
                  disabled={property.isAutoComputed === true}
                  className={`w-1/3 px-7 py-3 border_input ${
                    disableField[key] ? 'hidden' : 'block'
                  }`}
                  radius={15}
                  rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
                  styles={{ rightSection: { pointerEvents: 'none' } }}
                  label={property.name}
                  placeholder={`Nhập ${property.name}`}
                  data={data as Array<any>}
                  onChange={(e: any) => {
                    const value = e;
                    const dataChoie = constantFormData?.question[key]?.find(
                      (item: any) => item.value == value
                    );

                    handleChangeForm({ [key]: value });
                    handleChangeFormToPreview({ [key]: dataChoie });
                  }}
                  value={formData[key]}
                />
              );
            }
            default:
              break;
          }
        })}
      {Object.keys(dataForRoleConfig).length > 0 &&
        // trường nào server tự tính thì không hiện ra
        config?.properties
          .filter((property: any) => property.isAutoComputed === false)
          .filter((property: any) => property.scope === 'question')
          .map((property: any) => {
            const key = property.type;
            switch (property.inputType) {
              case TypeInput.STRING:
                return (
                  <TextInput
                    className={`w-1/3 px-7 py-3 border_input ${
                      disableField[key] ? 'hidden' : 'block'
                    }`}
                    radius={15}
                    label={property.name}
                    placeholder={`Nhập ${property.name}`}
                    onChange={(e: any) => {
                      const value = e.target.value;
                      handleChangeForm({ [key]: value });
                    }}
                    value={formData[key]}
                  />
                );
              case TypeInput.ARRAY: {
                return (
                  <MultiSelect
                    className={`w-1/3 px-7 py-3 unborder_input ${
                      disableField[key] ? 'hidden' : 'block'
                    }`}
                    radius={15}
                    rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    label={property.name}
                    placeholder={`Nhập ${property.name}`}
                    data={dataForRoleConfig[key] || []}
                    onChange={(e: any) => {
                      const value = e;
                      const dataChoie = dataForRoleConfig[key].find(
                        (item: any) => item.value == value
                      );

                      handleChangeForm({ [key]: value });
                      handleChangeFormToPreview({ [key]: dataChoie });
                    }}
                    value={formData[key]}
                  />
                );
              }
              case TypeInput.NUMBER: {
                return (
                  <Select
                    className={`w-1/3 px-7 py-3 border_input ${
                      disableField[key] ? 'hidden' : 'block'
                    }`}
                    radius={15}
                    rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
                    styles={{ rightSection: { pointerEvents: 'none' } }}
                    label={property.name}
                    placeholder={`Nhập ${property.name}`}
                    data={dataForRoleConfig[key] || []}
                    onChange={(e: any) => {
                      const value = e;
                      const dataChoie = dataForRoleConfig[key].find(
                        (item: any) => item.value == value
                      );

                      handleChangeForm({ [key]: value });
                      handleChangeFormToPreview({ [key]: dataChoie });
                    }}
                    value={String(formData[key])}
                  />
                );
              }
              default:
                break;
            }
          })}
      {/* <label className='font-[500] text-[14px] text-[#212529]'>Đơn vị kiến thức</label> */}
      <div className='w-full px-7 py-3 flex items-center flex-wrap'>
        <label
          className='mantine-1w07r5r mantine-Select-label w-full'
          style={{
            fontFamily:
              '-apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
          }}
        >
          Đơn vị kiến thức
        </label>

        <div className='w-full flex items-center'>
          <div className='min-w-[30%] w-fit flex border-[#B2B2B2] border min-h-[35px] rounded-2xl flex-wrap h-fit'>
            {listTopic.map((key: any) => (
              <div
                className='px-[8px] py-[6px] text-white bg-[#1C1F37] m-1 rounded-2xl flex items-center'
                style={{ fontWeight: 500 }}
              >
                <p className='mr-2'>{`${key?.name}`}</p>
                <div
                  className='cursor-pointer'
                  onClick={() =>
                    setListTopic(() =>
                      listTopic.filter((item: any) => item.idKnowledgeUnit != key.idKnowledgeUnit)
                    )
                  }
                >
                  <svg
                    width='9'
                    height='12'
                    viewBox='0 0 8 9'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.008 4.30048L7.856 0.396484H5.84L4 2.92448L2.16 0.396484H0.16L3.008 4.28448L0 8.39648H2.016L4.016 5.66048L6 8.39648H8L5.008 4.30048Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
          <div>
            <div
              className='bg-ct-secondary  text-white font-bold rounded-[8px] ml-2 flex justify-center items-center px-2 py-1 text-sm cursor-pointer'
              onClick={() => setOpened((o) => !o)}
            >
              <div className='pl-[2px]'>
                <Add size='28' color='currentColor' />
              </div>
              <p className='tracking-wider'>Thêm</p>
            </div>
          </div>
        </div>

        <div className='w-full'>
          <p className='text-[16px] text-[#8E8E8E] mt-2'>
            {listTopic.length > 0 && (
              <>
                {' '}
                Chuyên đề:{' '}
                {ListNameThematic.map((item: any) => `${item.idThematic} - ${item.name}`).join(
                  ', '
                )}
              </>
            )}
          </p>
        </div>
      </div>
      <Modal
        opened={opened}
        onClose={() => {
          // onClose();
        }}
        size={'55%'}
        hideCloseButton={true}
        radius={15}
      >
        <div className='flex justify-between my-2'>
          <p className='font-bold text-[18px] text-black'>Chọn đơn vị kiến thức</p>
          <Add
            size='28'
            color='#017EFA'
            style={{ transform: 'rotate(135deg)' }}
            onClick={() => setOpened(false)}
          />
        </div>
        <div className='flex my-2'>
          <div className='w-1/2 pr-4'>
            <TextInput
              placeholder='Tìm kiếm'
              radius={15}
              height={40}
              onChange={(e: any) => {
                searchByName(e.target.value);
              }}
              rightSection={<SearchNormal1 size='14' color='#017EFA' />}
            />
          </div>
          <div className='w-1/2 pl-4'>
            <Select
              data={ListThematic.map((item: any) => {
                item['label'] = item.name;
                item['value'] = '' + item.idThematic;
                return item;
              })}
              clearable
              searchable
              placeholder='Chọn chuyên đề'
              radius={15}
              height={40}
              onChange={(value: string) => {
                setIDThematic(value);
                searchByThematic(value);
              }}
            />
          </div>
        </div>
        <div style={{ borderBottom: '1px solid #ddd' }}>
          <div className='flex flex-wrap pb-2'>
            {listTopicSelected.map((key: any) => (
              <div className='px-2 py-[6px] bg-[#1C1F37] rounded-[10px] flex mx-1 my-1 items-center w-fit'>
                <p className='text-white mr-2'>{key.name}</p>
                <div className='cursor-pointer' onClick={() => handleDelteTopic(key)}>
                  <svg
                    width='9'
                    height='12'
                    viewBox='0 0 8 9'
                    fill='none'
                    xmlns='http://www.w3.org/2000/svg'
                  >
                    <path
                      d='M5.008 4.30048L7.856 0.396484H5.84L4 2.92448L2.16 0.396484H0.16L3.008 4.28448L0 8.39648H2.016L4.016 5.66048L6 8.39648H8L5.008 4.30048Z'
                      fill='white'
                    />
                  </svg>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className='h-[175px] overflow-y-scroll my-2'>
          {knowLedge.map((key: any) => (
            <div
              className='px-[8px] py-[10px] text-black hover:bg-[#017EFA] hover:text-white'
              style={{ fontWeight: 500 }}
              onClick={() => setListTopicSelected([...listTopicSelected, key])}
            >
              <p>{`${key.name}`}</p>
            </div>
          ))}
        </div>
        <div className='flex justify-center'>
          <div
            className='bg-ct-secondary cursor-pointer text-white font-bold rounded-[8px] ml-2 flex justify-center items-center px-3 py-2 text-sm'
            onClick={() => addKnowledgeUnit()}
          >
            Xác nhận
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default DynamicForm;
