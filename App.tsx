import React, { useState, useCallback, useRef, useEffect } from 'react';
import { AnalysisResult, AppView } from './types';
import CameraView from './components/CameraView';
import ResultsDisplay from './components/ResultsDisplay';
import Loader from './components/Loader';
import { analyzeImage } from './services/geminiService';
import { RefreshIcon, SearchIcon, CloseIcon, CameraIcon, UploadIcon, CropIcon, TrashIcon } from './components/Icons';

type SelectionBox = { x: number; y: number; width: number; height: number };

const App: React.FC = () => {
  const [view, setView] = useState<AppView>('home');
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [history, setHistory] = useState<AnalysisResult[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isDraggingOver, setIsDraggingOver] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const interactionRef = useRef<{ startX: number; startY: number } | null>(null);

  const [isSelecting, setIsSelecting] = useState(false);
  const [selectionBox, setSelectionBox] = useState<SelectionBox | null>(null);

  useEffect(() => {
    try {
      const savedHistory = localStorage.getItem('scanHistory');
      if (savedHistory) {
        setHistory(JSON.parse(savedHistory));
      }
    } catch (e) {
      console.error("Failed to load history from localStorage", e);
    }
  }, []);
  
  const resetState = useCallback(() => {
    setView('home');
    setCapturedImage(null);
    setAnalysisResult(null);
    setError(null);
    setIsSelecting(false);
    setSelectionBox(null);
    setIsDraggingOver(false);
  }, []);

  const handleCapture = useCallback((imageData: string) => {
    setCapturedImage(imageData);
    setView('preview');
  }, []);

  const cropImage = async (base64Image: string, box: SelectionBox): Promise<string> => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => {
        const displayedImage = imageRef.current;
        if (!displayedImage) {
          return reject(new Error("Image element not found for cropping."));
        }

        const { naturalWidth, naturalHeight } = img;
        const { width: displayWidth, height: displayHeight, left: displayLeft, top: displayTop } = displayedImage.getBoundingClientRect();
        const containerRect = displayedImage.parentElement!.getBoundingClientRect();

        const offsetX = displayLeft - containerRect.left;
        const offsetY = displayTop - containerRect.top;

        const scaleX = naturalWidth / displayWidth;
        const scaleY = naturalHeight / displayHeight;
        
        const relativeBoxX = box.x - offsetX;
        const relativeBoxY = box.y - offsetY;

        const cropX = Math.max(0, relativeBoxX * scaleX);
        const cropY = Math.max(0, relativeBoxY * scaleY);
        const cropWidth = Math.min(naturalWidth - cropX, box.width * scaleX);
        const cropHeight = Math.min(naturalHeight - cropY, box.height * scaleY);

        if (cropWidth <= 0 || cropHeight <= 0) {
          return reject(new Error("Invalid selection box. Please try again."));
        }

        const cropCanvas = document.createElement('canvas');
        cropCanvas.width = cropWidth;
        cropCanvas.height = cropHeight;
        const ctx = cropCanvas.getContext('2d');
        if (!ctx) {
          return reject(new Error("Could not get canvas context for cropping."));
        }
        ctx.drawImage(img, cropX, cropY, cropWidth, cropHeight, 0, 0, cropWidth, cropHeight);
        resolve(cropCanvas.toDataURL('image/jpeg', 0.9).split(',')[1]);
      };
      img.onerror = () => reject(new Error("Failed to load image for cropping."));
      img.src = `data:image/jpeg;base64,${base64Image}`;
    });
  };

  const handleAnalyze = useCallback(async () => {
    if (!capturedImage) return;

    setError(null);
    try {
      let imageToAnalyze = capturedImage;
      let croppedPreview: string | undefined = undefined;

      if (isSelecting && selectionBox && selectionBox.width > 10 && selectionBox.height > 10) {
        imageToAnalyze = await cropImage(capturedImage, selectionBox);
        croppedPreview = imageToAnalyze;
      }
      
      setView('loading');

      const result = await analyzeImage(imageToAnalyze);
      
      const newResult: AnalysisResult = {
        ...result,
        id: Date.now().toString(),
        originalImage: capturedImage,
        croppedImagePreview: croppedPreview,
      };

      setAnalysisResult(newResult);
      
      setHistory(prevHistory => {
        const updatedHistory = [newResult, ...prevHistory].slice(0, 20); // Limit history
        try {
          localStorage.setItem('scanHistory', JSON.stringify(updatedHistory));
        } catch (e) {
          console.error("Failed to save history to localStorage", e);
        }
        return updatedHistory;
      });
      
      setView('results');
    } catch (err: any) {
      setError(err.message || 'An unknown error occurred.');
      setView('error');
    }
  }, [capturedImage, isSelecting, selectionBox]);

  const processFile = (file: File) => {
    if (!file || !file.type.startsWith('image/')) {
      setError('Please provide an image file.');
      setView('error');
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result;
      if (typeof result === 'string') {
        setCapturedImage(result.split(',')[1]);
        setView('preview');
      }
    };
    reader.onerror = () => {
      setError('Failed to read the image file.');
      setView('error');
    };
    reader.readAsDataURL(file);
  };

  const handleHistorySelect = (result: AnalysisResult) => {
    setAnalysisResult(result);
    setCapturedImage(result.originalImage);
    setView('results');
  };

  const handleClearHistory = () => {
    setHistory([]);
    try {
      localStorage.removeItem('scanHistory');
    } catch (e) {
      console.error("Failed to clear history from localStorage", e);
    }
  };
  
  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      processFile(file);
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDraggingOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (view === 'preview' && isSelecting && canvas) {
      const ctx = canvas.getContext('2d');
      const container = canvas.parentElement;
      if (ctx && container) {
        canvas.width = container.clientWidth;
        canvas.height = container.clientHeight;
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        if (selectionBox) {
          ctx.fillStyle = 'rgba(0, 0, 0, 0.6)';
          ctx.fillRect(0, 0, canvas.width, canvas.height);
          ctx.clearRect(selectionBox.x, selectionBox.y, selectionBox.width, selectionBox.height);
          ctx.strokeStyle = '#6366f1'; // indigo-500
          ctx.lineWidth = 3;
          ctx.strokeRect(selectionBox.x, selectionBox.y, selectionBox.width, selectionBox.height);
        }
      }
    }
  }, [view, isSelecting, selectionBox]);

  const getCoords = (e: React.MouseEvent | React.TouchEvent, target: HTMLElement) => {
    const rect = target.getBoundingClientRect();
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    return { x: clientX - rect.left, y: clientY - rect.top };
  };

  const handleInteractionStart = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting) return;
    const target = e.currentTarget as HTMLElement;
    const { x, y } = getCoords(e, target);
    interactionRef.current = { startX: x, startY: y };
    setSelectionBox({ x, y, width: 0, height: 0 });
    e.preventDefault();
  };

  const handleInteractionMove = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting || !interactionRef.current) return;
    const target = e.currentTarget as HTMLElement;
    const { startX, startY } = interactionRef.current;
    const { x: currentX, y: currentY } = getCoords(e, target);
    const newBox = {
      x: Math.min(startX, currentX),
      y: Math.min(startY, currentY),
      width: Math.abs(currentX - startX),
      height: Math.abs(currentY - startY),
    };
    setSelectionBox(newBox);
    e.preventDefault();
  };

  const handleInteractionEnd = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isSelecting || !interactionRef.current) return;
    interactionRef.current = null;
    e.preventDefault();
  };

  const renderContent = () => {
    switch (view) {
      case 'home':
        return (
          <div className="w-full min-h-screen flex flex-col items-center justify-center p-4 sm:p-6 md:p-8">
            <div 
              className={`w-full max-w-5xl flex-shrink-0 flex flex-col items-center justify-center text-center p-8 transition-all duration-300 rounded-2xl ${isDraggingOver ? 'border-4 border-dashed border-indigo-500 bg-gray-800' : 'border-4 border-transparent'}`}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
            >
              {isDraggingOver ? (
                <div className="pointer-events-none">
                  <UploadIcon className="w-24 h-24 text-indigo-400 animate-bounce" />
                  <h2 className="mt-4 text-3xl font-bold text-white">Drop your image here</h2>
                </div>
              ) : (
                <>
                  <div className="mb-8 p-6 bg-indigo-500/20 rounded-full">
                      <SearchIcon className="w-16 h-16 text-indigo-400"/>
                  </div>
                  <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">Price Scanner AI</h1>
                  <p className="mt-4 max-w-xl text-lg text-gray-400">
                    Use your camera, upload, or drag & drop an image to identify any item, get its estimated price, and discover similar products instantly.
                  </p>
                  <div className="mt-10 flex flex-col sm:flex-row items-center gap-4">
                    <button
                      onClick={() => setView('camera')}
                      className="inline-flex items-center justify-center gap-3 bg-indigo-600 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500 transform hover:scale-105 transition-all duration-200 w-64"
                    >
                      <CameraIcon className="w-6 h-6"/>
                      Scan an Item
                    </button>
                    <button
                      onClick={handleUploadClick}
                      className="inline-flex items-center justify-center gap-3 bg-gray-700 text-white font-semibold py-4 px-8 rounded-full text-lg shadow-lg hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-gray-500 transform hover:scale-105 transition-all duration-200 w-64"
                    >
                      <UploadIcon className="w-6 h-6"/>
                      Upload Image
                    </button>
                  </div>
                </>
              )}
            </div>
            {history.length > 0 && (
              <div className="w-full max-w-5xl mt-10 px-4 flex-shrink-0">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-2xl font-bold text-white">Scan History</h2>
                    <button onClick={handleClearHistory} className="flex items-center gap-2 text-sm text-gray-400 hover:text-white hover:bg-gray-700 py-2 px-3 rounded-lg transition-colors">
                      <TrashIcon className="w-4 h-4" />
                      Clear
                    </button>
                </div>
                <div className="flex gap-4 overflow-x-auto pb-4 -mx-4 px-4 scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
                  {history.map(item => (
                    <button key={item.id} onClick={() => handleHistorySelect(item)} className="bg-gray-800 rounded-xl p-3 flex-shrink-0 w-40 text-left hover:bg-gray-700/80 transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-indigo-500">
                      <img src={`data:image/jpeg;base64,${item.croppedImagePreview || item.originalImage}`} alt={item.itemName} className="w-full h-24 object-cover rounded-md mb-3" />
                      <h3 className="font-semibold text-white truncate leading-tight">{item.itemName}</h3>
                      <p className="text-sm text-emerald-400 font-medium">{item.averagePrice}</p>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 'camera':
        return <div className="w-screen h-screen"><CameraView onCapture={handleCapture} onCancel={resetState} /></div>;

      case 'preview':
        if (!capturedImage) return null;
        return (
          <div className="w-screen h-screen flex flex-col bg-black">
            <div className="absolute top-4 left-4 z-20">
              <button onClick={resetState} className="bg-black/50 p-3 rounded-full text-white hover:bg-black/75 transition-colors">
                <CloseIcon className="w-6 h-6" />
              </button>
            </div>
            <div className="flex-grow relative flex items-center justify-center overflow-hidden" 
              onMouseDown={handleInteractionStart} onMouseMove={handleInteractionMove} onMouseUp={handleInteractionEnd} onMouseLeave={handleInteractionEnd}
              onTouchStart={handleInteractionStart} onTouchMove={handleInteractionMove} onTouchEnd={handleInteractionEnd}>
              <img ref={imageRef} src={`data:image/jpeg;base64,${capturedImage}`} alt="Captured preview" className="max-w-full max-h-full object-contain select-none" />
              {isSelecting && <canvas ref={canvasRef} className="absolute top-0 left-0 pointer-events-none" />}
              {isSelecting && !selectionBox && (
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black/70 text-white p-3 rounded-lg pointer-events-none text-center text-sm md:text-base">
                  <p>Tap and drag to select an item</p>
                </div>
              )}
            </div>
            <div className="flex-shrink-0 bg-gray-900/80 backdrop-blur-sm p-4">
              <div className="max-w-3xl mx-auto flex justify-center items-center gap-4 sm:gap-6">
                <button onClick={() => { setView('camera'); setIsSelecting(false); setSelectionBox(null); }} className="bg-gray-200 text-gray-800 font-bold py-3 px-5 sm:px-6 rounded-full flex items-center gap-2 shadow-lg hover:bg-white transition-colors">
                  <RefreshIcon className="w-5 h-5"/> Retake
                </button>
                <button onClick={() => { setIsSelecting(!isSelecting); setSelectionBox(null); }} className={`font-bold py-3 px-5 sm:px-6 rounded-full flex items-center gap-2 shadow-lg transition-colors ${isSelecting ? 'bg-indigo-600 text-white' : 'bg-gray-600 text-white hover:bg-gray-500'}`}>
                  <CropIcon className="w-5 h-5"/> {isSelecting ? 'Cancel' : 'Select'}
                </button>
                <button onClick={handleAnalyze} className="bg-emerald-500 text-white font-bold py-3 px-5 sm:px-6 rounded-full flex items-center gap-2 shadow-lg hover:bg-emerald-400 transition-colors disabled:bg-gray-500 disabled:opacity-50" disabled={isSelecting && (!selectionBox || selectionBox.width < 10 || selectionBox.height < 10)}>
                  <SearchIcon className="w-5 h-5"/> Analyze
                </button>
              </div>
            </div>
          </div>
        );

      case 'loading':
        return <div className="w-screen h-screen"><Loader /></div>;

      case 'results':
        if (!analysisResult) return null;
        return <div className="w-full min-h-screen overflow-y-auto flex items-center justify-center"><ResultsDisplay results={analysisResult} imagePreviewUrl={`data:image/jpeg;base64,${analysisResult.croppedImagePreview || analysisResult.originalImage}`} onReset={resetState} /></div>;

      case 'error':
        return (
          <div className="w-screen h-screen flex flex-col items-center justify-center text-center p-8 bg-red-900/20">
            <h2 className="text-3xl font-bold text-red-400">Analysis Failed</h2>
            <p className="mt-2 max-w-md text-gray-300">{error}</p>
            <button onClick={resetState} className="mt-8 bg-indigo-600 text-white font-semibold py-3 px-6 rounded-full hover:bg-indigo-500 transition-colors">
              Try Again
            </button>
          </div>
        );
        
      default:
        return null;
    }
  };

  return (
    <main className="w-full min-h-screen bg-gray-900 text-white">
      {renderContent()}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
        className="hidden"
      />
    </main>
  );
};

export default App;