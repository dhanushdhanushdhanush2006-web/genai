'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { User, Palette, Sparkles, Save, Shuffle, X } from 'lucide-react';

interface AvatarConfig {
  emoji: string;
  style: string;
  color: string;
  accessory: string;
  background: string;
  name: string;
}

interface AvatarCreatorProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (avatar: AvatarConfig) => void;
  currentAvatar?: AvatarConfig;
}

const avatarEmojis = [
  '😊', '😎', '🤗', '😇', '🥰', '😌', '🤔', '😴', '🤓', '😋',
  '🌟', '🌈', '🌸', '🌺', '🌻', '🌷', '🌹', '🦋', '🐱', '🐶',
  '🦊', '🐼', '🐨', '🦁', '🐯', '🐸', '🐙', '🦄', '🐲', '👑',
  '💎', '⭐', '🔥', '💫', '✨', '🎭', '🎨', '🎪', '🎯', '🎲'
];

const avatarStyles = [
  { id: 'friendly', name: 'Friendly', gradient: 'from-blue-400 to-blue-600' },
  { id: 'energetic', name: 'Energetic', gradient: 'from-orange-400 to-red-500' },
  { id: 'calm', name: 'Calm', gradient: 'from-green-400 to-green-600' },
  { id: 'wise', name: 'Wise', gradient: 'from-purple-400 to-purple-600' },
  { id: 'playful', name: 'Playful', gradient: 'from-pink-400 to-pink-600' },
  { id: 'mysterious', name: 'Mysterious', gradient: 'from-gray-600 to-gray-800' }
];

const avatarColors = [
  '#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6', 
  '#EC4899', '#06B6D4', '#84CC16', '#F97316', '#6366F1'
];

const accessories = [
  { id: 'none', name: 'None', emoji: '' },
  { id: 'crown', name: 'Crown', emoji: '👑' },
  { id: 'glasses', name: 'Glasses', emoji: '👓' },
  { id: 'hat', name: 'Hat', emoji: '🎩' },
  { id: 'flower', name: 'Flower', emoji: '🌸' },
  { id: 'star', name: 'Star', emoji: '⭐' },
  { id: 'heart', name: 'Heart', emoji: '💖' },
  { id: 'sparkle', name: 'Sparkle', emoji: '✨' }
];

const backgrounds = [
  { id: 'gradient1', name: 'Sunset', gradient: 'from-orange-400 via-red-500 to-pink-500' },
  { id: 'gradient2', name: 'Ocean', gradient: 'from-blue-400 via-blue-500 to-blue-600' },
  { id: 'gradient3', name: 'Forest', gradient: 'from-green-400 via-green-500 to-green-600' },
  { id: 'gradient4', name: 'Galaxy', gradient: 'from-purple-400 via-pink-500 to-red-500' },
  { id: 'gradient5', name: 'Dawn', gradient: 'from-yellow-400 via-orange-500 to-red-500' },
  { id: 'gradient6', name: 'Twilight', gradient: 'from-indigo-400 via-purple-500 to-pink-500' }
];

export default function AvatarCreator({ isOpen, onClose, onSave, currentAvatar }: AvatarCreatorProps) {
  const [avatar, setAvatar] = useState<AvatarConfig>(currentAvatar || {
    emoji: '😊',
    style: 'friendly',
    color: '#3B82F6',
    accessory: 'none',
    background: 'gradient1',
    name: 'My Avatar'
  });

  const [activeTab, setActiveTab] = useState<'emoji' | 'style' | 'color' | 'accessory' | 'background'>('emoji');

  const randomizeAvatar = () => {
    setAvatar({
      emoji: avatarEmojis[Math.floor(Math.random() * avatarEmojis.length)],
      style: avatarStyles[Math.floor(Math.random() * avatarStyles.length)].id,
      color: avatarColors[Math.floor(Math.random() * avatarColors.length)],
      accessory: accessories[Math.floor(Math.random() * accessories.length)].id,
      background: backgrounds[Math.floor(Math.random() * backgrounds.length)].id,
      name: avatar.name
    });
  };

  const handleSave = () => {
    onSave(avatar);
    onClose();
  };

  const getStyleGradient = () => {
    const style = avatarStyles.find(s => s.id === avatar.style);
    return style?.gradient || 'from-blue-400 to-blue-600';
  };

  const getBackgroundGradient = () => {
    const bg = backgrounds.find(b => b.id === avatar.background);
    return bg?.gradient || 'from-orange-400 via-red-500 to-pink-500';
  };

  const getAccessoryEmoji = () => {
    const accessory = accessories.find(a => a.id === avatar.accessory);
    return accessory?.emoji || '';
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <User className="w-6 h-6 mr-2" />
                Create Your Avatar
              </h2>
              <p className="opacity-90">Design your unique virtual identity</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row h-[600px]">
          {/* Preview Section */}
          <div className="lg:w-1/2 p-6 flex flex-col items-center justify-center bg-gray-50">
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-800 mb-4 text-center">Preview</h3>
              
              {/* Avatar Preview */}
              <div className={`relative w-32 h-32 rounded-full bg-gradient-to-br ${getBackgroundGradient()} p-1 shadow-2xl`}>
                <div className={`w-full h-full rounded-full bg-gradient-to-br ${getStyleGradient()} flex items-center justify-center relative overflow-hidden`}>
                  <div className="text-6xl relative">
                    {avatar.emoji}
                    {getAccessoryEmoji() && (
                      <div className="absolute -top-2 -right-2 text-2xl">
                        {getAccessoryEmoji()}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Avatar Name */}
            <div className="w-full max-w-xs">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Avatar Name
              </label>
              <input
                type="text"
                value={avatar.name}
                onChange={(e) => setAvatar({ ...avatar, name: e.target.value })}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 text-center"
                placeholder="Enter avatar name"
                maxLength={20}
              />
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-3 mt-6">
              <button
                onClick={randomizeAvatar}
                className="flex items-center space-x-2 px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-lg transition-colors"
              >
                <Shuffle className="w-4 h-4" />
                <span>Random</span>
              </button>
              <button
                onClick={handleSave}
                className="flex items-center space-x-2 px-6 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
              >
                <Save className="w-4 h-4" />
                <span>Save Avatar</span>
              </button>
            </div>
          </div>

          {/* Customization Section */}
          <div className="lg:w-1/2 flex flex-col">
            {/* Tabs */}
            <div className="flex border-b border-gray-200 overflow-x-auto">
              {[
                { id: 'emoji', label: 'Face', icon: '😊' },
                { id: 'style', label: 'Style', icon: '🎨' },
                { id: 'color', label: 'Color', icon: '🌈' },
                { id: 'accessory', label: 'Accessory', icon: '👑' },
                { id: 'background', label: 'Background', icon: '🌅' }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex-1 min-w-0 px-4 py-3 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'text-purple-600 border-b-2 border-purple-600 bg-purple-50'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }`}
                >
                  <div className="flex flex-col items-center space-y-1">
                    <span className="text-lg">{tab.icon}</span>
                    <span className="hidden sm:block">{tab.label}</span>
                  </div>
                </button>
              ))}
            </div>

            {/* Tab Content */}
            <div className="flex-1 p-6 overflow-y-auto">
              <AnimatePresence mode="wait">
                {activeTab === 'emoji' && (
                  <motion.div
                    key="emoji"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-6 gap-3"
                  >
                    {avatarEmojis.map((emoji) => (
                      <button
                        key={emoji}
                        onClick={() => setAvatar({ ...avatar, emoji })}
                        className={`p-3 text-2xl rounded-lg border-2 transition-all hover:scale-110 ${
                          avatar.emoji === emoji
                            ? 'border-purple-500 bg-purple-50 scale-110'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {emoji}
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'style' && (
                  <motion.div
                    key="style"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {avatarStyles.map((style) => (
                      <button
                        key={style.id}
                        onClick={() => setAvatar({ ...avatar, style: style.id })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          avatar.style === style.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${style.gradient} mx-auto mb-2`} />
                        <div className="font-medium text-gray-800">{style.name}</div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'color' && (
                  <motion.div
                    key="color"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-5 gap-4"
                  >
                    {avatarColors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setAvatar({ ...avatar, color })}
                        className={`w-12 h-12 rounded-full border-4 transition-all hover:scale-110 ${
                          avatar.color === color
                            ? 'border-purple-500 scale-110'
                            : 'border-gray-200'
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </motion.div>
                )}

                {activeTab === 'accessory' && (
                  <motion.div
                    key="accessory"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-3 gap-4"
                  >
                    {accessories.map((accessory) => (
                      <button
                        key={accessory.id}
                        onClick={() => setAvatar({ ...avatar, accessory: accessory.id })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          avatar.accessory === accessory.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className="text-3xl mb-2">{accessory.emoji || '∅'}</div>
                        <div className="text-sm font-medium text-gray-800">{accessory.name}</div>
                      </button>
                    ))}
                  </motion.div>
                )}

                {activeTab === 'background' && (
                  <motion.div
                    key="background"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="grid grid-cols-2 gap-4"
                  >
                    {backgrounds.map((bg) => (
                      <button
                        key={bg.id}
                        onClick={() => setAvatar({ ...avatar, background: bg.id })}
                        className={`p-4 rounded-lg border-2 transition-all ${
                          avatar.background === bg.id
                            ? 'border-purple-500 bg-purple-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <div className={`w-full h-12 rounded-lg bg-gradient-to-r ${bg.gradient} mb-2`} />
                        <div className="font-medium text-gray-800">{bg.name}</div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
