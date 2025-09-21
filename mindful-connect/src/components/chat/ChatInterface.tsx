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
import { useAuth } from '@/contexts/AuthContext';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
  emotion?: string;
  language?: string;
}

interface AvatarCustomization {
  style: 'friendly' | 'professional' | 'playful' | 'wise';
  color: string;
  language: string;
  voice: 'male' | 'female' | 'neutral';
  personality: 'empathetic' | 'energetic' | 'calm' | 'wise';
}

export default function ChatInterface() {
  const { user } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [currentEmotion, setCurrentEmotion] = useState('neutral');
  const [isLoading, setIsLoading] = useState(false);
  const [showCreativePanel, setShowCreativePanel] = useState(false);
  const [showEmergencyPanel, setShowEmergencyPanel] = useState(false);
  const [showMoodGenerator, setShowMoodGenerator] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [showVideoCall, setShowVideoCall] = useState(false);
  const [showMultimediaGenerator, setShowMultimediaGenerator] = useState(false);
  const [avatarCustomization, setAvatarCustomization] = useState<AvatarCustomization>({
    style: 'friendly',
    color: '#6366f1',
    language: 'en',
    voice: 'neutral',
    personality: 'empathetic'
  });
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    // Welcome message
    if (messages.length === 0) {
      const welcomeMessage: Message = {
        id: '1',
        text: `Hello ${user?.isAnonymous ? 'friend' : user?.displayName || 'there'}! I'm your AI companion. I'm here to listen, understand your feelings, and support you. How are you feeling today?`,
        sender: 'ai',
        timestamp: new Date(),
        emotion: 'happy'
      };
      setMessages([welcomeMessage]);
    }
  }, [user, messages.length]);

  const handleSendMessage = async () => {
    if (!inputText.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputText('');
    setIsLoading(true);

    try {
      // Analyze emotion
      const emotionAnalysis = await analyzeTextEmotion(inputText);
      setCurrentEmotion(emotionAnalysis.emotion);

      // Generate AI response
      setIsSpeaking(true);
      const aiResponse = await generateAIResponse(inputText, emotionAnalysis.emotion, avatarCustomization.language);

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        sender: 'ai',
        timestamp: new Date(),
        emotion: emotionAnalysis.emotion,
        language: avatarCustomization.language,
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsSpeaking(false);
    } catch (error) {
      console.error('Error processing message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm sorry, I'm having trouble processing your message right now. Please try again.",
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsSpeaking(false);
    } finally {
      setIsLoading(false);
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
    // TODO: Implement speech recognition
  };

  const handleCameraEmotionDetected = (emotion: string, confidence: number) => {
    setCurrentEmotion(emotion);
    // Optionally send a message about the detected emotion
    if (confidence > 0.8) {
      const emotionMessage: Message = {
        id: Date.now().toString(),
        text: `I can see you're feeling ${emotion}. How can I support you right now?`,
        sender: 'ai',
        timestamp: new Date(),
        emotion: emotion,
        language: avatarCustomization.language,
      };
      setMessages(prev => [...prev, emotionMessage]);
    }
  };

  const generateCreative = async (type: 'art' | 'music' | 'story') => {
    setIsLoading(true);
    try {
      const content = await generateCreativeContent(currentEmotion, type);
      const creativeMessage: Message = {
        id: Date.now().toString(),
        text: `Here's some ${type} inspiration for you:\n\n${content}`,
        sender: 'ai',
        timestamp: new Date(),
        emotion: currentEmotion,
      };
      setMessages(prev => [...prev, creativeMessage]);
    } catch (error) {
      console.error('Error generating creative content:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-gray-800">AI Companion</h1>
          <div className="flex space-x-2">
            <CameraEmotionDetector
              onEmotionDetected={handleCameraEmotionDetected}
              isActive={isCameraActive}
              onToggle={() => setIsCameraActive(!isCameraActive)}
            />
            <button
              onClick={() => setShowEmergencyPanel(true)}
              className="p-2 rounded-full bg-red-100 hover:bg-red-200 transition-colors"
            >
              <AlertTriangle className="w-5 h-5 text-red-600" />
            </button>
            <button
              onClick={() => setShowVideoCall(true)}
              className="p-2 rounded-full bg-green-100 hover:bg-green-200 transition-colors"
              title="Start Video Call with AI"
            >
              <Video className="w-5 h-5 text-green-600" />
            </button>
            <button
              onClick={() => setShowMoodGenerator(!showMoodGenerator)}
              className="p-2 rounded-full bg-purple-100 hover:bg-purple-200 transition-colors"
            >
              <Sparkles className="w-5 h-5 text-purple-600" />
            </button>
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
          </div>
        </div>
      </div>

      {/* Creative Panel */}
      <AnimatePresence>
        {showCreativePanel && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="bg-white/90 backdrop-blur-sm border-b border-gray-200 p-4"
          >
            <div className="flex space-x-4 justify-center">
              <button
                onClick={() => generateCreative('art')}
                className="flex items-center space-x-2 px-4 py-2 bg-purple-100 hover:bg-purple-200 rounded-lg transition-colors"
              >
                <Palette className="w-4 h-4" />
                <span>Generate Art</span>
              </button>
              <button
                onClick={() => generateCreative('music')}
                className="flex items-center space-x-2 px-4 py-2 bg-green-100 hover:bg-green-200 rounded-lg transition-colors"
              >
                <Music className="w-4 h-4" />
                <span>Music Suggestions</span>
              </button>
              <button
                onClick={() => generateCreative('story')}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 rounded-lg transition-colors"
              >
                <BookOpen className="w-4 h-4" />
                <span>Create Story</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mood Content Generator */}
      <AnimatePresence>
        {showMoodGenerator && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="border-b border-gray-200 p-4"
          >
            <MoodContentGenerator
              currentMood={currentEmotion}
              userLanguage={avatarCustomization.language}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Avatar */}
      <div className="flex justify-center py-6">
        <CustomizableAvatar
          emotion={currentEmotion}
          isListening={isListening}
          isSpeaking={isSpeaking}
          customization={avatarCustomization}
          onCustomizationChange={setAvatarCustomization}
        />
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 pb-4">
        <div className="max-w-2xl mx-auto space-y-4">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                  message.sender === 'user'
                    ? 'bg-indigo-500 text-white'
                    : 'bg-white text-gray-800 shadow-sm'
                }`}
              >
                <p className="text-sm whitespace-pre-wrap">{message.text}</p>
                <p className="text-xs opacity-70 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white text-gray-800 shadow-sm px-4 py-2 rounded-2xl">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="bg-white/80 backdrop-blur-sm border-t border-gray-200 p-4">
        <div className="max-w-2xl mx-auto flex items-center space-x-2">
          <button
            onClick={toggleListening}
            className={`p-3 rounded-full transition-colors ${
              isListening ? 'bg-red-500 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-600'
            }`}
          >
            {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>
          
          <div className="flex-1 relative">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Share your thoughts and feelings..."
              className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              rows={1}
              style={{ minHeight: '48px', maxHeight: '120px' }}
            />
          </div>
          
          <button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="p-3 bg-indigo-500 hover:bg-indigo-600 disabled:bg-gray-300 text-white rounded-full transition-colors"
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
