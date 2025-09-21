'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Star, Crown, Heart, Zap, X, Check } from 'lucide-react';

interface AvatarConfig {
  emoji: string;
  style: string;
  color: string;
  accessory: string;
  background: string;
  name: string;
}

interface PresetAvatar extends AvatarConfig {
  id: string;
  category: 'popular' | 'new' | 'premium' | 'seasonal';
  description: string;
  likes: number;
}

interface AvatarGalleryProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (avatar: AvatarConfig) => void;
}

const presetAvatars: PresetAvatar[] = [
  // Popular Avatars
  {
    id: '1',
    emoji: '😊',
    style: 'friendly',
    color: '#3B82F6',
    accessory: 'none',
    background: 'gradient1',
    name: 'Sunny Smile',
    category: 'popular',
    description: 'A cheerful and welcoming avatar perfect for making new friends',
    likes: 1247
  },
  {
    id: '2',
    emoji: '🌟',
    style: 'energetic',
    color: '#F59E0B',
    accessory: 'crown',
    background: 'gradient4',
    name: 'Star Leader',
    category: 'popular',
    description: 'Confident and inspiring, great for community helpers',
    likes: 892
  },
  {
    id: '3',
    emoji: '🌸',
    style: 'calm',
    color: '#EC4899',
    accessory: 'flower',
    background: 'gradient3',
    name: 'Peaceful Blossom',
    category: 'popular',
    description: 'Serene and gentle, perfect for mindful conversations',
    likes: 756
  },
  {
    id: '4',
    emoji: '🦋',
    style: 'wise',
    color: '#8B5CF6',
    accessory: 'sparkle',
    background: 'gradient6',
    name: 'Wise Butterfly',
    category: 'popular',
    description: 'Thoughtful and insightful, ideal for deep discussions',
    likes: 634
  },

  // New Avatars
  {
    id: '5',
    emoji: '🎭',
    style: 'playful',
    color: '#EF4444',
    accessory: 'star',
    background: 'gradient2',
    name: 'Creative Spirit',
    category: 'new',
    description: 'Artistic and expressive, perfect for creative minds',
    likes: 123
  },
  {
    id: '6',
    emoji: '🔥',
    style: 'energetic',
    color: '#F97316',
    accessory: 'none',
    background: 'gradient1',
    name: 'Passionate Fire',
    category: 'new',
    description: 'Bold and determined, great for motivational support',
    likes: 89
  },
  {
    id: '7',
    emoji: '🌈',
    style: 'friendly',
    color: '#10B981',
    accessory: 'heart',
    background: 'gradient5',
    name: 'Rainbow Hope',
    category: 'new',
    description: 'Optimistic and colorful, spreads joy wherever they go',
    likes: 67
  },

  // Premium Avatars
  {
    id: '8',
    emoji: '👑',
    style: 'wise',
    color: '#6366F1',
    accessory: 'crown',
    background: 'gradient4',
    name: 'Royal Advisor',
    category: 'premium',
    description: 'Majestic and knowledgeable, for experienced helpers',
    likes: 445
  },
  {
    id: '9',
    emoji: '💎',
    style: 'mysterious',
    color: '#06B6D4',
    accessory: 'sparkle',
    background: 'gradient6',
    name: 'Diamond Soul',
    category: 'premium',
    description: 'Rare and precious, for special community members',
    likes: 321
  },
  {
    id: '10',
    emoji: '🦄',
    style: 'playful',
    color: '#EC4899',
    accessory: 'star',
    background: 'gradient4',
    name: 'Magical Unicorn',
    category: 'premium',
    description: 'Enchanting and unique, brings magic to conversations',
    likes: 567
  },

  // Seasonal Avatars
  {
    id: '11',
    emoji: '🌻',
    style: 'energetic',
    color: '#F59E0B',
    accessory: 'flower',
    background: 'gradient1',
    name: 'Summer Sunflower',
    category: 'seasonal',
    description: 'Bright and warm, perfect for summer vibes',
    likes: 234
  },
  {
    id: '12',
    emoji: '❄️',
    style: 'calm',
    color: '#06B6D4',
    accessory: 'sparkle',
    background: 'gradient2',
    name: 'Winter Crystal',
    category: 'seasonal',
    description: 'Cool and serene, brings winter peace',
    likes: 189
  }
];

const categories = [
  { id: 'popular', name: 'Popular', icon: Star, color: 'text-yellow-500' },
  { id: 'new', name: 'New', icon: Zap, color: 'text-green-500' },
  { id: 'premium', name: 'Premium', icon: Crown, color: 'text-purple-500' },
  { id: 'seasonal', name: 'Seasonal', icon: Heart, color: 'text-pink-500' }
];

const avatarStyles = {
  friendly: 'from-blue-400 to-blue-600',
  energetic: 'from-orange-400 to-red-500',
  calm: 'from-green-400 to-green-600',
  wise: 'from-purple-400 to-purple-600',
  playful: 'from-pink-400 to-pink-600',
  mysterious: 'from-gray-600 to-gray-800'
};

const backgrounds = {
  gradient1: 'from-orange-400 via-red-500 to-pink-500',
  gradient2: 'from-blue-400 via-blue-500 to-blue-600',
  gradient3: 'from-green-400 via-green-500 to-green-600',
  gradient4: 'from-purple-400 via-pink-500 to-red-500',
  gradient5: 'from-yellow-400 via-orange-500 to-red-500',
  gradient6: 'from-indigo-400 via-purple-500 to-pink-500'
};

const accessories = {
  none: '',
  crown: '👑',
  glasses: '👓',
  hat: '🎩',
  flower: '🌸',
  star: '⭐',
  heart: '💖',
  sparkle: '✨'
};

export default function AvatarGallery({ isOpen, onClose, onSelect }: AvatarGalleryProps) {
  const [selectedCategory, setSelectedCategory] = useState<'popular' | 'new' | 'premium' | 'seasonal'>('popular');
  const [selectedAvatar, setSelectedAvatar] = useState<string | null>(null);

  const filteredAvatars = presetAvatars.filter(avatar => avatar.category === selectedCategory);

  const handleSelect = (avatar: PresetAvatar) => {
    onSelect({
      emoji: avatar.emoji,
      style: avatar.style,
      color: avatar.color,
      accessory: avatar.accessory,
      background: avatar.background,
      name: avatar.name
    });
    onClose();
  };

  const getStyleGradient = (style: string) => {
    return avatarStyles[style as keyof typeof avatarStyles] || 'from-blue-400 to-blue-600';
  };

  const getBackgroundGradient = (background: string) => {
    return backgrounds[background as keyof typeof backgrounds] || 'from-orange-400 via-red-500 to-pink-500';
  };

  const getAccessoryEmoji = (accessory: string) => {
    return accessories[accessory as keyof typeof accessories] || '';
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
        className="bg-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold flex items-center">
                <Users className="w-6 h-6 mr-2" />
                Avatar Gallery
              </h2>
              <p className="opacity-90">Choose from our collection of beautiful avatars</p>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/20 rounded-full transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div className="flex flex-col h-[600px]">
          {/* Category Tabs */}
          <div className="flex border-b border-gray-200 bg-gray-50">
            {categories.map((category) => {
              const Icon = category.icon;
              const count = presetAvatars.filter(a => a.category === category.id).length;
              
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id as any)}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center justify-center space-x-2">
                    <Icon className={`w-4 h-4 ${selectedCategory === category.id ? 'text-blue-600' : category.color}`} />
                    <span>{category.name}</span>
                    <span className="bg-gray-200 text-gray-600 text-xs px-2 py-1 rounded-full">
                      {count}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>

          {/* Avatar Grid */}
          <div className="flex-1 p-6 overflow-y-auto">
            <motion.div
              key={selectedCategory}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filteredAvatars.map((avatar) => (
                <motion.div
                  key={avatar.id}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`bg-white rounded-xl border-2 p-4 cursor-pointer transition-all ${
                    selectedAvatar === avatar.id
                      ? 'border-blue-500 shadow-lg'
                      : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
                  }`}
                  onClick={() => setSelectedAvatar(avatar.id)}
                >
                  {/* Avatar Preview */}
                  <div className="flex justify-center mb-4">
                    <div className={`relative w-20 h-20 rounded-full bg-gradient-to-br ${getBackgroundGradient(avatar.background)} p-1`}>
                      <div className={`w-full h-full rounded-full bg-gradient-to-br ${getStyleGradient(avatar.style)} flex items-center justify-center relative`}>
                        <div className="text-4xl relative">
                          {avatar.emoji}
                          {getAccessoryEmoji(avatar.accessory) && (
                            <div className="absolute -top-1 -right-1 text-lg">
                              {getAccessoryEmoji(avatar.accessory)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Avatar Info */}
                  <div className="text-center">
                    <h3 className="font-semibold text-gray-800 mb-1">{avatar.name}</h3>
                    <p className="text-sm text-gray-600 mb-3 line-clamp-2">{avatar.description}</p>
                    
                    {/* Stats */}
                    <div className="flex items-center justify-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Heart className="w-3 h-3 text-red-500" />
                        <span>{avatar.likes}</span>
                      </div>
                      <div className="capitalize">{avatar.style}</div>
                    </div>
                  </div>

                  {/* Select Button */}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleSelect(avatar);
                    }}
                    className="w-full mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
                  >
                    <Check className="w-4 h-4" />
                    <span>Select Avatar</span>
                  </button>
                </motion.div>
              ))}
            </motion.div>

            {filteredAvatars.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <Users className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>No avatars found in this category.</p>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
