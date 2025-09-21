'use client';

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Mic, MicOff, Camera, CameraOff, Palette, Music, BookOpen, AlertTriangle, Sparkles, Video, Image, Film } from 'lucide-react';
import CustomizableAvatar from '../avatar/CustomizableAvatar';
import EmergencyPanel from '../emergency/EmergencyPanel';
import CameraEmotionDetector from '../emotion/CameraEmotionDetector';
import MoodContentGenerator from '../content/MoodContentGenerator';
import VideoCallWithAI from '../video/VideoCallWithAI';
import MultimediaGenerator from '../multimedia/MultimediaGenerator';
import { analyzeTextEmotion, generateAIResponse, generateCreativeContent, supportedLanguages } from '@/lib/gemini';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
}

interface AvatarCustomization {
  style: 'friendly' | 'professional' | 'playful' | 'wise';
  color: string;
  language: string;
  voice: 'male' | 'female' | 'neutral';
  personality: 'empathetic' | 'energetic' | 'calm' | 'wise';
}

export default function DemoChatInterface() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI companion. I\'m here to listen, understand, and support you. How are you feeling today?',
      sender: 'ai',
      timestamp: new Date(),
    }
  ]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [showCreativePanel, setShowCreativePanel] = useState(false);
  const [showMoodGenerator, setShowMoodGenerator] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMultimediaGenerator, setShowMultimediaGenerator] = useState(false);
  const [avatarCustomization, setAvatarCustomization] = useState<AvatarCustomization>({
    style: 'friendly',
    color: '#3B82F6',
    language: 'en',
    voice: 'female',
    personality: 'empathetic'
  });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');

    try {
      // Analyze emotion
      const emotionAnalysis = await analyzeTextEmotion(inputText);
      setCurrentEmotion(emotionAnalysis.emotion);

      // Generate AI response
      const aiResponse = await generateAIResponse(
        inputText,
        emotionAnalysis.emotion,
        avatarCustomization.language
      );

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        emotion: emotionAnalysis.emotion,
      };

      setTimeout(() => {
        setMessages(prev => [...prev, aiMessage]);
      }, 1000);

    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: 'I apologize, but I\'m having trouble processing your message right now. Please try again.',
        sender: 'ai',
        timestamp: new Date(),
      };
      
      setTimeout(() => {
        setMessages(prev => [...prev, errorMessage]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleListening = () => {
    setIsListening(!isListening);
    // In a real implementation, this would start/stop speech recognition
  };

  const handleEmotionDetected = (emotion: string) => {
    setCurrentEmotion(emotion);
  };

  const generateCreativeContent = async (type: 'art' | 'music' | 'story') => {
    try {
      const content = await generateCreativeContent(type, currentEmotion, avatarCustomization.language);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: `I've created something special for you based on your ${currentEmotion} mood:\n\n${content}`,
        sender: 'ai',
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, aiMessage]);
      setShowCreativePanel(false);
    } catch (error) {
      console.error('Error generating creative content:', error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <CustomizableAvatar
            emotion={currentEmotion}
            isListening={isListening}
            isSpeaking={false}
            customization={avatarCustomization}
            onCustomizationChange={setAvatarCustomization}
          />
          <div>
            <h1 className="text-xl font-semibold text-gray-900">AI Companion</h1>
            <p className="text-sm text-gray-600">
              Speaking {supportedLanguages[avatarCustomization.language as keyof typeof supportedLanguages]} • {avatarCustomization.personality} personality
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <button
            onClick={() => setShowVideoCall(true)}
            className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
            title="Start Video Call"
          >
            <Video className="w-5 h-5 text-green-600" />
          </button>
          
          <button
            onClick={() => setIsCameraActive(!isCameraActive)}
            className={`p-2 rounded-full transition-colors ${
              isCameraActive 
                ? 'bg-blue-100 hover:bg-blue-200 text-blue-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isCameraActive ? <Camera className="w-5 h-5" /> : <CameraOff className="w-5 h-5" />}
          </button>

          <button
            onClick={() => setShowEmergencyPanel(true)}
            className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
          >
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </button>
        </div>
      </div>

      {/* Camera Emotion Detector */}
      {isCameraActive && (
        <div className="border-b border-gray-200">
          <CameraEmotionDetector onEmotionDetected={handleEmotionDetected} />
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <AnimatePresence>
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-lg ${
                  message.sender === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-gray-900 border border-gray-200'
                }`}
              >
                <p className="text-sm">{message.text}</p>
                <p className={`text-xs mt-1 ${
                  message.sender === 'user' ? 'text-indigo-200' : 'text-gray-500'
                }`}>
                  {message.timestamp.toLocaleTimeString()}
                  {message.emotion && ` • ${message.emotion}`}
                </p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="bg-white border-t border-gray-200 p-4">
        <div className="flex items-center space-x-2 mb-3">
          <button
            onClick={() => setShowCreativePanel(!showCreativePanel)}
            className="p-2 rounded-full bg-indigo-100 hover:bg-indigo-200 transition-colors"
          >
            <Palette className="w-5 h-5 text-indigo-600" />
          </button>
          <button
            onClick={() => setShowMultimediaGenerator(true)}
            className="p-2 rounded-full bg-orange-100 hover:bg-orange-200 transition-colors"
            title="Generate Images, Videos & Music"
          >
            <Film className="w-5 h-5 text-orange-600" />
          </button>
          <button
            onClick={() => setShowMoodGenerator(true)}
            className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
          >
            <Sparkles className="w-5 h-5 text-purple-600" />
          </button>
        </div>

        {/* Creative Panel */}
        <AnimatePresence>
          {showCreativePanel && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="mb-4 p-4 bg-gray-50 rounded-lg"
            >
              <h3 className="text-sm font-medium text-gray-700 mb-3">Generate Creative Content</h3>
              <div className="flex space-x-2">
                <button
                  onClick={() => generateCreativeContent('art')}
                  className="flex items-center space-x-2 px-3 py-2 bg-pink-100 hover:bg-pink-200 rounded-lg transition-colors"
                >
                  <Palette className="w-4 h-4 text-pink-600" />
                  <span className="text-sm text-pink-700">Art</span>
                </button>
                <button
                  onClick={() => generateCreativeContent('music')}
                  className="flex items-center space-x-2 px-3 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
                >
                  <Music className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-blue-700">Music</span>
                </button>
                <button
                  onClick={() => generateCreativeContent('story')}
                  className="flex items-center space-x-2 px-3 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
                >
                  <BookOpen className="w-4 h-4 text-green-600" />
                  <span className="text-sm text-green-700">Story</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center space-x-2">
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your message..."
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
              rows={1}
            />
          </div>
          
          <button
            onClick={toggleListening}
            className={`p-2 rounded-full transition-colors ${
              isListening 
                ? 'bg-red-100 hover:bg-red-200 text-red-600' 
                : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="p-2 rounded-full bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 disabled:cursor-not-allowed text-white transition-colors"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Emergency Panel */}
      <EmergencyPanel
        isOpen={showEmergencyPanel}
        onClose={() => setShowEmergencyPanel(false)}
      />

      {/* Mood Content Generator */}
      <MoodContentGenerator
        isOpen={showMoodGenerator}
        onClose={() => setShowMoodGenerator(false)}
        currentMood={currentEmotion}
        language={avatarCustomization.language}
      />

      {/* Video Call with AI */}
      <VideoCallWithAI
        isOpen={showVideoCall}
        onClose={() => setShowVideoCall(false)}
        aiPersonality={avatarCustomization.personality}
        userLanguage={avatarCustomization.language}
      />

      {/* Multimedia Generator */}
      <MultimediaGenerator
        isOpen={showMultimediaGenerator}
        onClose={() => setShowMultimediaGenerator(false)}
        currentMood={currentEmotion}
        language={avatarCustomization.language}
      />
    </div>
  );
}
