import React, { useRef, useEffect, useCallback, useState } from 'react';
import { CloseIcon, CameraIcon } from './Icons';

interface CameraViewProps {
  onCapture: (imageData: string) => void;
  onCancel: () => void;
}

const CameraView: React.FC<CameraViewProps> = ({ onCapture, onCancel }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let stream: MediaStream | null = null;
    const enableCamera = async () => {
      try {
        stream = await navigator.mediaDevices.getUserMedia({
          video: {
            facingMode: 'environment',
            width: { ideal: 1920 },
            height: { ideal: 1080 },
          },
        });
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      } catch (err) {
        console.error("Error accessing camera:", err);
        setError("Could not access camera. Please ensure permissions are granted and try again.");
      }
    };
    enableCamera();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = useCallback(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const context = canvas.getContext('2d');
      if (context) {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        context.drawImage(video, 0, 0, video.videoWidth, video.videoHeight);
        const dataUrl = canvas.toDataURL('image/jpeg', 0.9);
        onCapture(dataUrl.split(',')[1]);
      }
    }
  }, [onCapture]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full bg-black p-4">
        <p className="text-red-400 text-center mb-4">{error}</p>
        <button onClick={onCancel} className="bg-indigo-500 text-white font-bold py-2 px-4 rounded-lg">
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-black">
      <video ref={videoRef} autoPlay playsInline className="w-full h-full object-cover"></video>
      <canvas ref={canvasRef} className="hidden"></canvas>
      <div className="absolute inset-0 border-8 border-white/20 rounded-3xl pointer-events-none"></div>
      <div className="absolute top-4 left-4">
        <button onClick={onCancel} className="bg-black/50 p-3 rounded-full text-white hover:bg-black/75 transition-colors">
          <CloseIcon className="w-6 h-6" />
        </button>
      </div>
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
        <button onClick={handleCapture} className="w-20 h-20 bg-white rounded-full border-4 border-black/50 flex items-center justify-center group transform active:scale-90 transition-transform">
            <div className="w-16 h-16 bg-white rounded-full group-hover:bg-gray-200 transition-colors"></div>
        </button>
      </div>
    </div>
  );
};

export default CameraView;
