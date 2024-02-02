/* eslint-disable camelcase */
/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from 'react';
import { Select } from '@mantine/core';
import { getMediaLink } from 'api';
import { PathAPI } from 'api/route';
import { AnswerType, TypeUpload } from 'enum';
import { ArrowDown2, DocumentUpload, Trash } from 'iconsax-react';
import { notify } from 'utils/notify';

import '../../elements/UploadAsset/style.css';

type UploadAssetProps = {
  handleUrlAsset: ({
    typeUpload,
    url,
    field,
  }: {
    typeUpload: TypeUpload;
    url: string;
    field: any;
  }) => void;
  typeUpload: TypeUpload;
  data?: any;
};

const UploadAsset = ({ handleUrlAsset, typeUpload, data }: UploadAssetProps) => {
  const [typeAsset, setTypeAsset] = useState<AnswerType>(AnswerType.IMAGE);
  const [assetUrl, setAssetUrl] = useState<string>('');
  const [assetUrlvideo, setAssetUrlvideo] = useState<string>('');
  const [assetUrlaudio, setAssetUrlaudio] = useState<string>('');
  const imgRef = useRef<any>(null);
  const videoRef = useRef<any>(null);
  const audioRef = useRef<any>(null);
  const actionVideoref = useRef<any>(null);

  const handleUpload = () => {
    if (typeAsset === AnswerType.IMAGE) {
      if (imgRef.current) {
        const img = imgRef?.current?.files[0];
        if (img.size >= 5000000) {
          notify({
            type: 'error',
            message: 'Hình ảnh bạn đang quá kích cỡ 5MB',
          });
        } else {
          if (img) {
            getMediaLink('image', PathAPI.uploadFormdata, img).then((res: any) => {
              if (res.status) {
                const uri = res.data.images[0].uri;
                setAssetUrl(uri);
              }
            });
          }
        }
      }
    } else if (typeAsset === AnswerType.VIDEO) {
      if (videoRef.current) {
        const video = videoRef?.current?.files[0];
        if (video.size >= 52428800) {
          notify({
            type: 'error',
            message: 'Video bạn đang quá kích cỡ 50MB',
          });
        } else {
          getMediaLink('video', PathAPI.uploadVideo, video).then((res: any) => {
            if (res.status) {
              const uri = res.data.videos[0].uri;
              setAssetUrlvideo(uri);
            }
          });
        }
      }
    } else if (typeAsset === AnswerType.AUDIO) {
      if (audioRef.current) {
        const audio = audioRef?.current?.files[0];
        console.log(audio);

        if (audio.size >= 20971520) {
          notify({
            type: 'error',
            message: 'Video bạn đang quá kích cỡ 20MB',
          });
        } else {
          getMediaLink('audio', PathAPI.uploadAudio, audio).then((res: any) => {
            if (res.status) {
              const uri = res.data.audios[0].uri;
              setAssetUrlaudio(uri);
            }
          });
        }
      }
    }
  };

  const handleChooseFile = () => {
    imgRef.current.value = null;
    videoRef.current.value = null;
    audioRef.current.value = null;
    if (typeAsset === AnswerType.IMAGE) {
      if (imgRef.current) {
        imgRef.current.click();
      }
    } else if (typeAsset === AnswerType.VIDEO) {
      if (videoRef.current) {
        videoRef.current.click();
      }
    } else if (typeAsset === AnswerType.AUDIO) {
      if (audioRef.current) {
        audioRef.current.click();
      }
    }
  };

  useEffect(() => {
    switch (typeAsset) {
      case AnswerType.IMAGE: {
        handleUrlAsset({
          url: assetUrl,
          typeUpload: typeUpload,
          field: typeAsset,
        });
        break;
      }
      case AnswerType.AUDIO: {
        handleUrlAsset({
          url: assetUrlaudio,
          typeUpload: typeUpload,
          field: typeAsset,
        });
        break;
      }
      case AnswerType.VIDEO: {
        handleUrlAsset({
          url: assetUrlvideo,
          typeUpload: typeUpload,
          field: typeAsset,
        });
        break;
      }
      default:
        break;
    }
  }, [assetUrl, assetUrlvideo, assetUrlaudio, typeAsset]);

  useEffect(() => {
    if (data !== undefined && data != '') {
      if (typeUpload === TypeUpload.QUESTION) {
        const { image, audio, video } = data;
        if (image != '' && image) {
          setAssetUrl(image);
          setTypeAsset(AnswerType.IMAGE);
        } else if (audio != '' && audio) {
          setAssetUrlaudio(audio);
          setTypeAsset(AnswerType.AUDIO);
        } else if (video != '' && video) {
          setAssetUrlvideo(video);
          setTypeAsset(AnswerType.VIDEO);
        }
      } else if (typeUpload === TypeUpload.ANSWER) {
        const { solution_image, solution_audio, solution_video } = data;
        if (solution_image != '' && solution_image) {
          setAssetUrl(solution_image);
          setTypeAsset(AnswerType.IMAGE);
        } else if (solution_audio != '' && solution_audio) {
          setAssetUrlaudio(solution_audio);
          setTypeAsset(AnswerType.AUDIO);
        } else if (solution_video != '' && solution_video) {
          setAssetUrlvideo(solution_video);
          setTypeAsset(AnswerType.VIDEO);
        }
      } else {
        const { description_image, description_audio, description_video } = data;
        if (description_image != '' && description_image) {
          setAssetUrl(description_image);
          setTypeAsset(AnswerType.IMAGE);
        } else if (description_audio != '' && description_audio) {
          setAssetUrlaudio(description_audio);
          setTypeAsset(AnswerType.AUDIO);
        } else if (description_video != '' && description_video) {
          setAssetUrlvideo(description_video);
          setTypeAsset(AnswerType.VIDEO);
        }
      }
    }
  }, [data]);

  return (
    <div className='pb-6'>
      <div className='flex items-center h-fit'>
        <Select
          size='lg'
          className='w-fit py-4'
          radius={15}
          rightSection={<ArrowDown2 size={15} color='currentColor' variant='Bold' />}
          styles={{ rightSection: { pointerEvents: 'none' } }}
          data={[
            {
              value: AnswerType.IMAGE.toString(),
              label: 'Ảnh',
              disabled: false,
            },
            {
              value: AnswerType.VIDEO.toString(),
              label: 'Video',
              disabled: false,
            },
            {
              value: AnswerType.AUDIO.toString(),
              label: 'Âm thanh',
              disabled: false,
            },
          ]}
          value={typeAsset.toString()}
          onChange={(value) => {
            setTypeAsset(Number(value));
          }}
        />
        <div
          className='flex bg-ct-secondary text-white p-3 rounded-xl mx-4'
          onClick={handleChooseFile}
        >
          <DocumentUpload className='mx-2' size={20} variant='Outline' />
          <p>Tải lên </p>
        </div>
      </div>
      {typeAsset === AnswerType.IMAGE && assetUrl !== '' && assetUrl !== null ? (
        <div className='flex justify-between items-center'>
          <img src={assetUrl} className='w-fit h-fit max-w-[512px] max-h-[512px]' alt='Ảnh' />
          <Trash
            className='mx-2'
            size={30}
            variant='Outline'
            color='#DD405F'
            onClick={() => {
              setAssetUrl('');
              imgRef.current.value = null;
            }}
          />
        </div>
      ) : (
        ''
      )}
      {typeAsset === AnswerType.VIDEO && assetUrlvideo !== '' && assetUrlvideo !== null ? (
        <div className='flex justify-between items-center'>
          <div className=' w-[331px] h-[186px] relative'>
            <video
              src={assetUrlvideo}
              ref={actionVideoref}
              className='w-full h-full rounded-xl'
              controls
            ></video>
            {/* <div className={`absolute top-[38%] right-[42%]`}>
              <svg
                width='48'
                height='48'
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <circle cx='24' cy='24' r='24' fill='white' />
                <path
                  d='M19.87 33.28C19.08 33.28 18.33 33.09 17.67 32.71C16.11 31.81 15.25 29.98 15.25 27.57V20.44C15.25 18.02 16.11 16.2 17.67 15.3C19.23 14.4 21.24 14.57 23.34 15.78L29.51 19.34C31.6 20.55 32.76 22.21 32.76 24.01C32.76 25.81 31.61 27.47 29.51 28.68L23.34 32.24C22.13 32.93 20.95 33.28 19.87 33.28Z'
                  fill='#1B2B65'
                />
              </svg>
            </div> */}
          </div>
          <Trash
            className='mx-2'
            size={30}
            variant='Outline'
            color='#DD405F'
            onClick={() => {
              setAssetUrlvideo('');
              videoRef.current.value = null;
            }}
          />
        </div>
      ) : (
        ''
      )}

      {typeAsset === AnswerType.AUDIO && assetUrlaudio !== '' && assetUrlaudio !== null ? (
        <div className='flex justify-between items-center'>
          <div className=''>
            <audio controls src={assetUrlaudio}></audio>
          </div>
          <div>
            <Trash
              className='mx-2'
              size={30}
              variant='Outline'
              color='#DD405F'
              onClick={() => {
                setAssetUrlaudio('');
                audioRef.current.value = null;
              }}
            />
          </div>
        </div>
      ) : (
        ''
      )}
      <input
        type='file'
        accept='.jpg, .jpeg, .png'
        ref={imgRef}
        onChange={handleUpload}
        className='hidden'
      />
      <input type='file' accept='.mp4' ref={videoRef} onChange={handleUpload} className='hidden' />
      <input
        type='file'
        accept='.mp3, .wav, .ogg'
        ref={audioRef}
        onChange={handleUpload}
        className='hidden'
      />
    </div>
  );
};

export default UploadAsset;
