// import { useEffect, useState } from 'react';

// const useRecorder = () => {
//   const [audioURL, setAudioURL] = useState<string>('');
//   const [isRecording, setIsRecording] = useState<boolean>(false);
//   const [recorder, setRecorder] = useState<any>(null);
//   const [audioFile, setAudioFile] = useState<any>(null);

//   useEffect(() => {
//     if (recorder === null) {
//       if (isRecording) {
//         requestRecorder().then(setRecorder, console.error);
//       }
//       return;
//     } else {
//       if (isRecording) {
//         recorder.start();
//       } else {
//         recorder.stop();
//       }
//       const handleData = (e: any) => {
//         setAudioURL(URL.createObjectURL(e.data));
//         setAudioFile(e.data);
//       };

//       recorder.addEventListener('dataavailable', handleData);
//       return () => {
//         recorder.removeEventListener('dataavailable', handleData);
//       };
//     }
//   }, [recorder, isRecording]);
//   const startRecording = () => {
//     setIsRecording(true);
//     setTimeout(() => {
//       setIsRecording(false);
//     }, 121000);
//   };

//   const stopRecording = () => {
//     setIsRecording(false);
//   };

//   const deleteData = () => {
//     setAudioURL('');
//   };

//   return [audioURL, isRecording, startRecording, stopRecording, deleteData, audioFile] as const;
// };
// async function requestRecorder() {
//   const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
//   return new MediaRecorder(stream);
// }
// export default useRecorder;

import React, { useEffect, useRef, useState } from 'react';
import RecordRTC from 'recordrtc';

const useRecorder = () => {
  const [recording, setRecording] = useState<string>('');
  const [startTime, setStartTime] = useState<any>(null);
  const [isRecording, setIsRecording] = useState(false); // Add isRecording state
  const mediaRecorderRef = useRef<any>(null);
  const timerRef = useRef<any>(null);
  const [recordingTime, setRecordingTime] = useState(0);
  const [audioFile, setAudioFile] = useState<any>(null);

  const handleStartRecording = () => {
    const constraints = { audio: true };
    navigator.mediaDevices
      .getUserMedia(constraints)
      .then((stream) => {
        const recorder = new RecordRTC(stream, {
          type: 'audio',
        });
        recorder.startRecording();
        mediaRecorderRef.current = recorder;
        setStartTime(new Date());
        startTimer();
        setIsRecording(true); // Set isRecording to true
      })
      .catch((error) => {
        console.error('Error starting recording:', error);
      });
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stopRecording(() => {
        const blob = mediaRecorderRef.current.getBlob();
        const url = URL.createObjectURL(blob);
        setRecording(url);
        clearInterval(timerRef.current);
        setStartTime(null);
        setIsRecording(false); // Set isRecording to false
        const file = new File([blob], 'recorded_audio.mp3', {
          type: 'audio/mp3',
        });
        setAudioFile(file);
      });
    }
    return true;
  };

  const deleteData = () => {
    setRecording('');
    // setAudioFile()
  };

  const startTimer = () => {
    timerRef.current = setInterval(() => {
      const currentTime: any = new Date();
      const elapsedTime = Math.floor((currentTime - startTime) / 1000);
      console.log('Elapsed time:', elapsedTime);
      setRecordingTime((prev) => prev + 1);
    }, 1000);
  };

  useEffect(() => {
    return () => {
      clearInterval(timerRef.current);
    };
  }, []);

  // return (
  //   <div>
  //     {recording && <audio src={recording} controls />}
  //     <div>
  //       Recording time: {recordingTime} seconds
  //       <button onClick={handleStartRecording}>Start Recording</button>
  //       {isRecording ? (
  //         <button onClick={handlePauseRecording}>Pause Recording</button>
  //       ) : (
  //         <button onClick={handleResumeRecording}>Resume Recording</button>
  //       )}
  //       <button onClick={handleStopRecording}>Stop Recording</button>
  //     </div>
  //   </div>
  // );
  return [
    recording,
    recordingTime,
    isRecording,
    handleStopRecording,
    handleStartRecording,
    deleteData,
    audioFile,
  ] as const;
};

export default useRecorder;
