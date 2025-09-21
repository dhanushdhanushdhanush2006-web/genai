'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AIAvatarProps {
  emotion: string;
  isListening: boolean;
  isSpeaking: boolean;
}

export default function AIAvatar({ emotion, isListening, isSpeaking }: AIAvatarProps) {
  const [currentExpression, setCurrentExpression] = useState('neutral');

  useEffect(() => {
    setCurrentExpression(emotion);
  }, [emotion]);

  const getAvatarColor = () => {
    switch (currentExpression) {
      case 'happy': return 'from-yellow-400 to-orange-500';
      case 'sad': return 'from-blue-400 to-blue-600';
      case 'angry': return 'from-red-400 to-red-600';
      case 'anxious': return 'from-purple-400 to-purple-600';
      case 'excited': return 'from-pink-400 to-pink-600';
      case 'calm': return 'from-green-400 to-green-600';
      default: return 'from-indigo-400 to-indigo-600';
    }
  };

  const getEyeExpression = () => {
    switch (currentExpression) {
      case 'happy': return 'rounded-full';
      case 'sad': return 'rounded-full opacity-70';
      case 'angry': return 'rounded-sm';
      case 'anxious': return 'rounded-full scale-110';
      case 'excited': return 'rounded-full animate-pulse';
      default: return 'rounded-full';
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      <motion.div
        animate={{
          scale: isSpeaking ? [1, 1.05, 1] : isListening ? [1, 1.02, 1] : 1,
          rotate: isSpeaking ? [0, 2, -2, 0] : 0,
        }}
        transition={{
          duration: isSpeaking ? 0.5 : isListening ? 1 : 0,
          repeat: isSpeaking || isListening ? Infinity : 0,
        }}
        className={`w-32 h-32 rounded-full bg-gradient-to-br ${getAvatarColor()} shadow-2xl flex items-center justify-center relative overflow-hidden`}
      >
        {/* Face */}
        <div className="relative w-full h-full flex items-center justify-center">
          {/* Eyes */}
          <div className="flex space-x-4 mb-4">
            <motion.div
              animate={{
                scaleY: isSpeaking ? [1, 0.3, 1] : 1,
              }}
              transition={{
                duration: 0.3,
                repeat: isSpeaking ? Infinity : 0,
              }}
              className={`w-3 h-3 bg-white ${getEyeExpression()}`}
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
              className={`w-3 h-3 bg-white ${getEyeExpression()}`}
            />
          </div>

          {/* Mouth */}
          <motion.div
            animate={{
              scaleX: isSpeaking ? [1, 1.3, 0.8, 1] : 1,
              scaleY: isSpeaking ? [1, 0.8, 1.2, 1] : 1,
            }}
            transition={{
              duration: 0.4,
              repeat: isSpeaking ? Infinity : 0,
            }}
            className="absolute bottom-8 w-6 h-3 bg-white rounded-full opacity-80"
          />

          {/* Listening indicator */}
          {isListening && (
            <motion.div
              animate={{
                scale: [1, 1.2, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
              }}
              className="absolute inset-0 rounded-full border-4 border-white/30"
            />
          )}
        </div>

        {/* Emotion particles */}
        <motion.div
          animate={{
            rotate: 360,
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
          className="absolute inset-0"
        >
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-white/20 rounded-full"
              style={{
                top: `${20 + Math.sin(i * 60 * Math.PI / 180) * 30}%`,
                left: `${50 + Math.cos(i * 60 * Math.PI / 180) * 30}%`,
              }}
              animate={{
                scale: [0.5, 1, 0.5],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.3,
              }}
            />
          ))}
        </motion.div>
      </motion.div>

      {/* Status text */}
      <motion.p
        animate={{
          opacity: [0.7, 1, 0.7],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
        }}
        className="text-sm text-gray-600 font-medium"
      >
        {isSpeaking ? 'Speaking...' : isListening ? 'Listening...' : 'Ready to help'}
      </motion.p>

      {/* Emotion indicator */}
      <div className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
        Feeling: {currentExpression}
      </div>
    </div>
  );
}
