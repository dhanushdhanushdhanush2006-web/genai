'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Video, VideoOff, Mic, MicOff, Phone, PhoneOff,
  Volume2, VolumeX, Settings, Maximize, Minimize,
  Camera, CameraOff, MessageCircle, Heart, Sparkles
} from 'lucide-react';
import AI3DAvatar from './AI3DAvatar';

interface VideoCallProps {
  isOpen: boolean;
  onClose: () => void;
  aiPersonality: string;
  userLanguage: string;
}

interface CallStats {
  duration: number;
  emotionsDetected: string[];
  supportLevel: 'low' | 'medium' | 'high';
  aiResponseCount: number;
}

export default function VideoCallWithAI({ isOpen, onClose, aiPersonality, userLanguage }: VideoCallProps) {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isVideoEnabled, setIsVideoEnabled] = useState(true);
  const [isAudioEnabled, setIsAudioEnabled] = useState(true);
  const [isAISpeaking, setIsAISpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [aiMessage, setAiMessage] = useState('');
  const [callStats, setCallStats] = useState<CallStats>({
    duration: 0,
    emotionsDetected: [],
    supportLevel: 'medium',
    aiResponseCount: 0
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const callTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Simulated AI responses based on personality and language
  const aiResponses = {
    en: {
      empathetic: [
        "I can see you're feeling thoughtful today. How has your day been treating you?",
        "Your expression tells me you might have something on your mind. I'm here to listen.",
        "I notice a gentle energy about you. What would you like to talk about?",
        "Thank you for sharing this moment with me. How are you feeling right now?"
      ],
      energetic: [
        "Hey there! I love the energy I'm seeing! What's got you excited today?",
        "You look ready to take on the world! Tell me what's inspiring you!",
        "I can feel your positive vibes through the screen! What's making you smile?",
        "Your enthusiasm is contagious! What amazing things are happening in your life?"
      ],
      calm: [
        "I sense a peaceful presence about you. Let's take a moment to breathe together.",
        "Your calm energy is beautiful. What brings you this sense of tranquility?",
        "I can see the serenity in your expression. How can we nurture this peaceful feeling?",
        "There's something wonderfully grounding about your presence. What's centering you today?"
      ],
      wise: [
        "I observe depth in your expression. What wisdom are you contemplating today?",
        "Your thoughtful demeanor suggests you're processing something meaningful. Care to share?",
        "I can see the reflection in your eyes. What insights have you gained recently?",
        "There's a contemplative quality about you. What questions are you exploring?"
      ]
    },
    es: {
      empathetic: [
        "Puedo ver que te sientes reflexivo/a hoy. ¿Cómo ha sido tu día?",
        "Tu expresión me dice que podrías tener algo en mente. Estoy aquí para escuchar.",
        "Noto una energía gentil en ti. ¿De qué te gustaría hablar?",
        "Gracias por compartir este momento conmigo. ¿Cómo te sientes ahora?"
      ]
    },
    hi: {
      empathetic: [
        "मैं देख सकता हूं कि आप आज विचारशील महसूस कर रहे हैं। आपका दिन कैसा रहा?",
        "आपकी अभिव्यक्ति मुझे बताती है कि आपके मन में कुछ हो सकता है। मैं सुनने के लिए यहां हूं।",
        "मैं आपमें एक कोमल ऊर्जा देखता हूं। आप किस बारे में बात करना चाहेंगे?",
        "इस पल को मेरे साथ साझा करने के लिए धन्यवाद। आप अभी कैसा महसूस कर रहे हैं?"
      ]
    }
  };

  const startCall = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      
      streamRef.current = stream;
      setIsCallActive(true);
      
      // Start call timer
      callTimerRef.current = setInterval(() => {
        setCallStats(prev => ({ ...prev, duration: prev.duration + 1 }));
      }, 1000);

      // Simulate AI greeting
      setTimeout(() => {
        simulateAIResponse('greeting');
      }, 2000);

      // Start emotion detection simulation
      startEmotionDetection();
      
    } catch (error) {
      console.error('Error accessing camera/microphone:', error);
      alert('Unable to access camera or microphone. Please check permissions.');
    }
  };

  const endCall = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    
    if (callTimerRef.current) {
      clearInterval(callTimerRef.current);
      callTimerRef.current = null;
    }
    
    setIsCallActive(false);
    setIsAISpeaking(false);
    setIsListening(false);
    
    // Show call summary
    setTimeout(() => {
      onClose();
    }, 1000);
  };

  const simulateAIResponse = (trigger: string = 'general') => {
    const responses = aiResponses[userLanguage as keyof typeof aiResponses] || aiResponses.en;
    const personalityResponses = responses[aiPersonality as keyof typeof responses] || responses.empathetic;
    const randomResponse = personalityResponses[Math.floor(Math.random() * personalityResponses.length)];
    
    setAiMessage(randomResponse);
    setIsAISpeaking(true);
    setCallStats(prev => ({ 
      ...prev, 
      aiResponseCount: prev.aiResponseCount + 1 
    }));
    
    // Simulate speaking duration
    setTimeout(() => {
      setIsAISpeaking(false);
      setIsListening(true);
      
      // Stop listening after a while
      setTimeout(() => {
        setIsListening(false);
      }, 3000);
    }, 3000 + Math.random() * 2000);
  };

  const startEmotionDetection = () => {
    const emotions = ['happy', 'calm', 'thoughtful', 'excited', 'peaceful', 'curious'];
    
    const detectEmotion = () => {
      if (isCallActive) {
        const newEmotion = emotions[Math.floor(Math.random() * emotions.length)];
        setCurrentEmotion(newEmotion);
        
        setCallStats(prev => ({
          ...prev,
          emotionsDetected: [...new Set([...prev.emotionsDetected, newEmotion])]
        }));
        
        // Trigger AI response based on emotion change
        if (Math.random() > 0.7) {
          setTimeout(() => simulateAIResponse('emotion'), 1000);
        }
        
        setTimeout(detectEmotion, 5000 + Math.random() * 10000);
      }
    };
    
    setTimeout(detectEmotion, 3000);
  };

  const toggleVideo = () => {
    if (streamRef.current) {
      const videoTrack = streamRef.current.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !isVideoEnabled;
        setIsVideoEnabled(!isVideoEnabled);
      }
    }
  };

  const toggleAudio = () => {
    if (streamRef.current) {
      const audioTrack = streamRef.current.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !isAudioEnabled;
        setIsAudioEnabled(!isAudioEnabled);
      }
    }
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const getAIAvatarStyle = () => {
    switch (aiPersonality) {
      case 'energetic': return 'from-orange-400 to-red-500';
      case 'calm': return 'from-green-400 to-green-600';
      case 'wise': return 'from-purple-400 to-purple-600';
      default: return 'from-blue-400 to-blue-600';
    }
  };

  const getAIEmoji = () => {
    if (isAISpeaking) return '🗣️';
    if (isListening) return '👂';
    switch (aiPersonality) {
      case 'energetic': return '⚡';
      case 'calm': return '🧘';
      case 'wise': return '🦉';
      default: return '😊';
    }
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      if (callTimerRef.current) {
        clearInterval(callTimerRef.current);
      }
    };
  }, []);

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className={`fixed inset-0 bg-black z-50 flex flex-col ${isFullscreen ? '' : 'p-4'}`}
    >
      {/* Header */}
      {!isFullscreen && (
        <div className="bg-gray-900 text-white p-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className={`w-10 h-10 rounded-full bg-gradient-to-r ${getAIAvatarStyle()} flex items-center justify-center text-xl`}>
              {getAIEmoji()}
            </div>
            <div>
              <h3 className="font-semibold">AI Companion Video Call</h3>
              <p className="text-sm text-gray-300 capitalize">{aiPersonality} Personality</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {isCallActive && (
              <div className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                {formatDuration(callStats.duration)}
              </div>
            )}
            <button
              onClick={() => setIsFullscreen(!isFullscreen)}
              className="p-2 hover:bg-gray-700 rounded-full transition-colors"
            >
              {isFullscreen ? <Minimize className="w-5 h-5" /> : <Maximize className="w-5 h-5" />}
            </button>
          </div>
        </div>
      )}

      {/* Video Area */}
      <div className={`flex-1 bg-gray-900 relative ${isFullscreen ? '' : 'rounded-b-2xl'} overflow-hidden`}>
        {/* User Video */}
        <div className="absolute inset-0">
          {isCallActive ? (
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-full h-full object-cover ${!isVideoEnabled ? 'hidden' : ''}`}
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
              <div className="text-center text-white">
                <Video className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <h3 className="text-xl font-semibold mb-2">Ready to start your AI video call?</h3>
                <p className="text-gray-300 mb-6">Connect face-to-face with your AI companion for a more personal experience</p>
                <button
                  onClick={startCall}
                  className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold transition-colors flex items-center space-x-2 mx-auto"
                >
                  <Video className="w-5 h-5" />
                  <span>Start Video Call</span>
                </button>
              </div>
            </div>
          )}
          
          {!isVideoEnabled && isCallActive && (
            <div className="w-full h-full bg-gray-800 flex items-center justify-center">
              <div className="text-center text-white">
                <CameraOff className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>Camera is off</p>
              </div>
            </div>
          )}
        </div>

        {/* 3D AI Avatar */}
        {isCallActive && (
          <div className="absolute top-4 right-4 w-80 h-60 bg-black/20 backdrop-blur-sm rounded-2xl border-2 border-white/20 overflow-hidden">
            <AI3DAvatar
              isListening={isListening}
              isSpeaking={isAISpeaking}
              emotion={currentEmotion}
              personality={aiPersonality}
              language={userLanguage}
            />
          </div>
        )}

        {/* AI Message Overlay */}
        <AnimatePresence>
          {aiMessage && isCallActive && (
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 50 }}
              className="absolute bottom-20 left-4 right-4 bg-black/70 backdrop-blur-sm text-white p-4 rounded-2xl border border-white/20"
            >
              <div className="flex items-start space-x-3">
                <div className={`w-8 h-8 rounded-full bg-gradient-to-r ${getAIAvatarStyle()} flex items-center justify-center text-sm flex-shrink-0`}>
                  🤖
                </div>
                <div className="flex-1">
                  <p className="text-sm">{aiMessage}</p>
                  {isAISpeaking && (
                    <div className="flex items-center space-x-1 mt-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                      <span className="text-xs text-green-400">Speaking...</span>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Emotion Detection Indicator */}
        {isCallActive && currentEmotion !== 'neutral' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-4 left-4 bg-black/70 backdrop-blur-sm text-white px-3 py-2 rounded-full text-sm flex items-center space-x-2"
          >
            <Heart className="w-4 h-4 text-red-400" />
            <span className="capitalize">Feeling {currentEmotion}</span>
          </motion.div>
        )}

        {/* Controls */}
        {isCallActive && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-4 bg-black/70 backdrop-blur-sm rounded-full px-6 py-3">
            <button
              onClick={toggleVideo}
              className={`p-3 rounded-full transition-colors ${
                isVideoEnabled 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isVideoEnabled ? <Video className="w-5 h-5" /> : <VideoOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={toggleAudio}
              className={`p-3 rounded-full transition-colors ${
                isAudioEnabled 
                  ? 'bg-gray-600 hover:bg-gray-500 text-white' 
                  : 'bg-red-500 hover:bg-red-600 text-white'
              }`}
            >
              {isAudioEnabled ? <Mic className="w-5 h-5" /> : <MicOff className="w-5 h-5" />}
            </button>
            
            <button
              onClick={() => simulateAIResponse()}
              className="p-3 rounded-full bg-blue-500 hover:bg-blue-600 text-white transition-colors"
              disabled={isAISpeaking}
            >
              <MessageCircle className="w-5 h-5" />
            </button>
            
            <button
              onClick={endCall}
              className="p-3 rounded-full bg-red-500 hover:bg-red-600 text-white transition-colors"
            >
              <PhoneOff className="w-5 h-5" />
            </button>
          </div>
        )}

        {/* Close button for non-call state */}
        {!isCallActive && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors"
          >
            <PhoneOff className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Call Stats (when call ends) */}
      {!isCallActive && callStats.duration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute inset-0 bg-black/90 flex items-center justify-center"
        >
          <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 text-center">
            <Sparkles className="w-12 h-12 text-purple-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-4">Call Summary</h3>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="font-medium">{formatDuration(callStats.duration)}</span>
              </div>
              <div className="flex justify-between">
                <span>AI Responses:</span>
                <span className="font-medium">{callStats.aiResponseCount}</span>
              </div>
              <div className="flex justify-between">
                <span>Emotions Detected:</span>
                <span className="font-medium">{callStats.emotionsDetected.length}</span>
              </div>
              <div className="flex justify-between">
                <span>Support Level:</span>
                <span className={`font-medium capitalize ${
                  callStats.supportLevel === 'high' ? 'text-green-600' :
                  callStats.supportLevel === 'medium' ? 'text-yellow-600' : 'text-blue-600'
                }`}>
                  {callStats.supportLevel}
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-full mt-6 bg-purple-500 hover:bg-purple-600 text-white py-3 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
