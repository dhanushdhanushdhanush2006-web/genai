'use client';

import React, { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, CameraOff, Smile, Frown, Meh, Heart, Zap } from 'lucide-react';

interface EmotionResult {
  emotion: string;
  confidence: number;
  timestamp: Date;
}

interface CameraEmotionDetectorProps {
  onEmotionDetected: (emotion: string, confidence: number) => void;
  isActive: boolean;
  onToggle: () => void;
}

export default function CameraEmotionDetector({ 
  onEmotionDetected, 
  isActive, 
  onToggle 
}: CameraEmotionDetectorProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [stream, setStream] = useState<MediaStream | null>(null);
  const [currentEmotion, setCurrentEmotion] = useState<EmotionResult | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Demo mode emotion detection (simulated)
  const detectEmotionDemo = () => {
    const emotions = ['happy', 'sad', 'neutral', 'surprised', 'calm', 'excited'];
    const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
    const confidence = 0.7 + Math.random() * 0.3; // 70-100% confidence
    
    const result: EmotionResult = {
      emotion: randomEmotion,
      confidence,
      timestamp: new Date()
    };
    
    setCurrentEmotion(result);
    onEmotionDetected(randomEmotion, confidence);
  };

  const startCamera = async () => {
    try {
      setError(null);
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: { 
          width: 640, 
          height: 480,
          facingMode: 'user' // Front camera for selfie
        }
      });
      
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
        videoRef.current.play();
      }
      
      // Start emotion detection interval (demo mode)
      const interval = setInterval(() => {
        if (isActive) {
          detectEmotionDemo();
        }
      }, 3000); // Detect every 3 seconds
      
      return () => clearInterval(interval);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setError('Unable to access camera. Please check permissions.');
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
    setCurrentEmotion(null);
  };

  useEffect(() => {
    if (isActive) {
      startCamera();
    } else {
      stopCamera();
    }
    
    return () => stopCamera();
  }, [isActive]);

  const getEmotionIcon = (emotion: string) => {
    switch (emotion) {
      case 'happy': return <Smile className="w-5 h-5 text-yellow-500" />;
      case 'sad': return <Frown className="w-5 h-5 text-blue-500" />;
      case 'excited': return <Zap className="w-5 h-5 text-orange-500" />;
      case 'calm': return <Heart className="w-5 h-5 text-green-500" />;
      default: return <Meh className="w-5 h-5 text-gray-500" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion) {
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'sad': return 'from-blue-400 to-blue-600';
      case 'excited': return 'from-orange-400 to-red-500';
      case 'calm': return 'from-green-400 to-green-600';
      case 'surprised': return 'from-purple-400 to-pink-500';
      default: return 'from-gray-400 to-gray-600';
    }
  };

  return (
    <div className="relative">
      {/* Camera Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onToggle}
        className={`p-3 rounded-full transition-colors ${
          isActive 
            ? 'bg-red-500 hover:bg-red-600 text-white' 
            : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
        }`}
      >
        {isActive ? <CameraOff className="w-5 h-5" /> : <Camera className="w-5 h-5" />}
      </motion.button>

      {/* Camera Feed Modal */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="absolute top-16 right-0 bg-white rounded-2xl shadow-2xl border border-gray-200 p-4 z-50"
            style={{ width: '320px' }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-gray-800">Emotion Detection</h3>
                <button
                  onClick={onToggle}
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <CameraOff className="w-4 h-4 text-gray-500" />
                </button>
              </div>

              {error ? (
                <div className="text-center py-8">
                  <Camera className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <p className="text-sm text-red-600">{error}</p>
                  <button
                    onClick={startCamera}
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg text-sm hover:bg-blue-600 transition-colors"
                  >
                    Try Again
                  </button>
                </div>
              ) : (
                <>
                  {/* Video Feed */}
                  <div className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <video
                      ref={videoRef}
                      className="w-full h-48 object-cover"
                      autoPlay
                      muted
                      playsInline
                    />
                    <canvas
                      ref={canvasRef}
                      className="hidden"
                      width={640}
                      height={480}
                    />
                    
                    {/* Processing Overlay */}
                    {isProcessing && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <div className="text-white text-sm">Analyzing...</div>
                      </div>
                    )}
                  </div>

                  {/* Emotion Result */}
                  {currentEmotion && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`p-4 rounded-lg bg-gradient-to-r ${getEmotionColor(currentEmotion.emotion)} text-white`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          {getEmotionIcon(currentEmotion.emotion)}
                          <span className="font-medium capitalize">
                            {currentEmotion.emotion}
                          </span>
                        </div>
                        <div className="text-sm opacity-90">
                          {Math.round(currentEmotion.confidence * 100)}%
                        </div>
                      </div>
                      <div className="text-xs opacity-80 mt-1">
                        Detected {currentEmotion.timestamp.toLocaleTimeString()}
                      </div>
                    </motion.div>
                  )}

                  {/* Privacy Notice */}
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-3">
                    <div className="flex items-start space-x-2">
                      <Heart className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                      <div className="text-xs text-blue-700">
                        <p className="font-medium">Privacy Protected</p>
                        <p>No images are stored. Only emotion data is processed locally.</p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
