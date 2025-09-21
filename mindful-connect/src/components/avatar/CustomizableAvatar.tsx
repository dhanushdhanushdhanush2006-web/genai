'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Settings, Globe, Palette, Volume2, VolumeX } from 'lucide-react';
import { supportedLanguages } from '@/lib/gemini';

interface AvatarCustomization {
  style: 'friendly' | 'professional' | 'playful' | 'wise';
  color: string;
  language: string;
  voice: 'male' | 'female' | 'neutral';
  personality: 'empathetic' | 'energetic' | 'calm' | 'wise';
}

interface CustomizableAvatarProps {
  emotion: string;
  isListening: boolean;
  isSpeaking: boolean;
  customization: AvatarCustomization;
  onCustomizationChange: (customization: AvatarCustomization) => void;
}

const languages = [
  // Indian Languages
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'hi', name: 'हिन्दी (Hindi)', flag: '🇮🇳' },
  { code: 'bn', name: 'বাংলা (Bengali)', flag: '🇮🇳' },
  { code: 'te', name: 'తెలుగు (Telugu)', flag: '🇮🇳' },
  { code: 'mr', name: 'मराठी (Marathi)', flag: '🇮🇳' },
  { code: 'ta', name: 'தமிழ் (Tamil)', flag: '🇮🇳' },
  { code: 'gu', name: 'ગુજરાતી (Gujarati)', flag: '🇮🇳' },
  { code: 'kn', name: 'ಕನ್ನಡ (Kannada)', flag: '🇮🇳' },
  { code: 'ml', name: 'മലയാളം (Malayalam)', flag: '🇮🇳' },
  { code: 'pa', name: 'ਪੰਜਾਬੀ (Punjabi)', flag: '🇮🇳' },
  { code: 'or', name: 'ଓଡ଼ିଆ (Odia)', flag: '🇮🇳' },
  { code: 'as', name: 'অসমীয়া (Assamese)', flag: '🇮🇳' },
  { code: 'ur', name: 'اردو (Urdu)', flag: '🇮🇳' },
  { code: 'sa', name: 'संस्कृत (Sanskrit)', flag: '🇮🇳' },
  { code: 'ne', name: 'नेपाली (Nepali)', flag: '🇳🇵' },
  { code: 'si', name: 'සිංහල (Sinhala)', flag: '🇱🇰' },
  { code: 'my', name: 'မြန်မာ (Myanmar)', flag: '🇲🇲' },
  { code: 'th', name: 'ไทย (Thai)', flag: '🇹🇭' },
  // International Languages
  { code: 'es', name: 'Español', flag: '🇪🇸' },
  { code: 'fr', name: 'Français', flag: '🇫🇷' },
  { code: 'de', name: 'Deutsch', flag: '🇩🇪' },
  { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  { code: 'pt', name: 'Português', flag: '🇧🇷' },
  { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  { code: 'ja', name: '日本語', flag: '🇯🇵' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'zh', name: '中文', flag: '🇨🇳' },
  { code: 'ar', name: 'العربية', flag: '🇸🇦' },
];

const avatarStyles = {
  friendly: { 
    gradient: 'from-blue-400 to-blue-600',
    personality: 'Warm and approachable',
    emoji: '😊'
  },
  professional: { 
    gradient: 'from-gray-500 to-gray-700',
    personality: 'Calm and reliable',
    emoji: '🤝'
  },
  playful: { 
    gradient: 'from-pink-400 to-purple-600',
    personality: 'Fun and energetic',
    emoji: '🎉'
  },
  wise: { 
    gradient: 'from-green-500 to-teal-600',
    personality: 'Thoughtful and insightful',
    emoji: '🧠'
  }
};

export default function CustomizableAvatar({
  emotion,
  isListening,
  isSpeaking,
  customization,
  onCustomizationChange
}: CustomizableAvatarProps) {
  const [showCustomization, setShowCustomization] = useState(false);
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);

  const currentStyle = avatarStyles[customization.style];
  const currentLanguage = languages.find(lang => lang.code === customization.language) || languages[0];

  const getEmotionModifier = () => {
    switch (emotion) {
      case 'happy': return 'brightness-110 saturate-110';
      case 'sad': return 'brightness-75 saturate-75';
      case 'angry': return 'hue-rotate-15 saturate-150';
      case 'anxious': return 'brightness-90 contrast-110';
      case 'excited': return 'brightness-125 saturate-125 hue-rotate-15';
      case 'calm': return 'brightness-105 saturate-90';
      default: return '';
    }
  };

  const getPersonalityAnimation = () => {
    switch (customization.personality) {
      case 'energetic':
        return {
          scale: isSpeaking ? [1, 1.1, 1] : [1, 1.02, 1],
          rotate: isSpeaking ? [0, 5, -5, 0] : 0,
        };
      case 'calm':
        return {
          scale: isSpeaking ? [1, 1.03, 1] : 1,
          y: [0, -2, 0],
        };
      case 'wise':
        return {
          scale: isSpeaking ? [1, 1.05, 1] : 1,
          opacity: [0.9, 1, 0.9],
        };
      default:
        return {
          scale: isSpeaking ? [1, 1.05, 1] : isListening ? [1, 1.02, 1] : 1,
        };
    }
  };

  return (
    <div className="flex flex-col items-center space-y-6">
      {/* Avatar Container */}
      <div className="relative">
        <motion.div
          animate={getPersonalityAnimation()}
          transition={{
            duration: customization.personality === 'energetic' ? 0.3 : 
                     customization.personality === 'calm' ? 2 : 1,
            repeat: isSpeaking || isListening ? Infinity : 0,
          }}
          className={`w-40 h-40 rounded-full bg-gradient-to-br ${currentStyle.gradient} ${getEmotionModifier()} shadow-2xl flex items-center justify-center relative overflow-hidden border-4 border-white/20`}
        >
          {/* Avatar Face */}
          <div className="relative w-full h-full flex items-center justify-center">
            {/* Main Expression */}
            <div className="text-6xl">
              {currentStyle.emoji}
            </div>

            {/* Eyes Animation */}
            <div className="absolute top-12 flex space-x-6">
              <motion.div
                animate={{
                  scaleY: isSpeaking ? [1, 0.3, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isSpeaking ? Infinity : 0,
                }}
                className="w-4 h-4 bg-white rounded-full opacity-80"
              />
              <motion.div
                animate={{
                  scaleY: isSpeaking ? [1, 0.3, 1] : 1,
                }}
                transition={{
                  duration: 0.3,
                  repeat: isSpeaking ? Infinity : 0,
                  delay: 0.1,
                }}
                className="w-4 h-4 bg-white rounded-full opacity-80"
              />
            </div>

            {/* Voice Indicator */}
            {isSpeaking && isVoiceEnabled && (
              <motion.div
                animate={{
                  scale: [1, 1.3, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: 0.5,
                  repeat: Infinity,
                }}
                className="absolute bottom-8 bg-white/30 rounded-full p-2"
              >
                <Volume2 className="w-4 h-4 text-white" />
              </motion.div>
            )}

            {/* Listening Indicator */}
            {isListening && (
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.8, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                }}
                className="absolute inset-0 rounded-full border-4 border-white/40"
              />
            )}
          </div>

          {/* Customization Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setShowCustomization(!showCustomization)}
            className="absolute -top-2 -right-2 bg-white/90 hover:bg-white text-gray-700 p-2 rounded-full shadow-lg transition-colors"
          >
            <Settings className="w-4 h-4" />
          </motion.button>
        </motion.div>
      </div>

      {/* Avatar Info */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg">{currentLanguage.flag}</span>
          <span className="font-medium text-gray-700">{currentLanguage.name}</span>
        </div>
        <p className="text-sm text-gray-600">{currentStyle.personality}</p>
        <div className="flex items-center justify-center space-x-2">
          <button
            onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
            className={`p-1 rounded-full transition-colors ${
              isVoiceEnabled ? 'text-green-600' : 'text-gray-400'
            }`}
          >
            {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
          </button>
          <span className="text-xs text-gray-500">
            {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready'}
          </span>
        </div>
      </div>

      {/* Customization Panel */}
      <AnimatePresence>
        {showCustomization && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="bg-white rounded-2xl shadow-2xl border border-gray-200 p-6 max-w-md w-full"
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-2" />
              Customize Your AI Companion
            </h3>

            <div className="space-y-6">
              {/* Avatar Style */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Avatar Style
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {Object.entries(avatarStyles).map(([key, style]) => (
                    <button
                      key={key}
                      onClick={() => onCustomizationChange({
                        ...customization,
                        style: key as AvatarCustomization['style']
                      })}
                      className={`p-3 rounded-lg border-2 transition-colors ${
                        customization.style === key
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${style.gradient} mx-auto mb-1`} />
                      <div className="text-xs font-medium capitalize">{key}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Language Selection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2 flex items-center">
                  <Globe className="w-4 h-4 mr-1" />
                  Language
                </label>
                <select
                  value={customization.language}
                  onChange={(e) => onCustomizationChange({
                    ...customization,
                    language: e.target.value
                  })}
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {languages.map((lang) => (
                    <option key={lang.code} value={lang.code}>
                      {lang.flag} {lang.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Personality */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Personality
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {['empathetic', 'energetic', 'calm', 'wise'].map((personality) => (
                    <button
                      key={personality}
                      onClick={() => onCustomizationChange({
                        ...customization,
                        personality: personality as AvatarCustomization['personality']
                      })}
                      className={`p-2 rounded-lg border-2 transition-colors text-sm ${
                        customization.personality === personality
                          ? 'border-blue-500 bg-blue-50 text-blue-700'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      {personality.charAt(0).toUpperCase() + personality.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={() => setShowCustomization(false)}
              className="w-full mt-6 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors"
            >
              Apply Changes
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
